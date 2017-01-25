BB.factory('commentsService', ['$http', 'postsService', '_', function($http, postsService, _) {
  
  var _comments = {},
      _recentComments = [],
      _id;

  $http.get('/data/comments.json').then(function(response){
    var extendedComments = _.each(response.data,_extendComment);
    angular.copy(extendedComments, _comments);
  })

  $http.get('/data/comments_by_date.json').then(function(response) {
    var recentComments = findBatch(_limitThree(response.data));
    recentComments.forEach(_updateRecentComments);
  });

  var recent = function() {
    return _recentComments;
  }

  var find = function(id) {
    return _comments[id];
  }

  var findBatch = function(ids) {
    return ids.map(find);
  }

  var create = function(comment) {
    comment.createdAt = new Date().toISOString().slice(0, 10);
    comment.votes = 0;
    comment.id = _nextID();
    _extendComment(comment);
    if (comment.commentableType === "post") {
      postsService.addComment(comment); 
    } 
    _updateRecentComments(comment);
    _comments[comment.id] = comment;
    _incrementID();
    return _comments[comment.id];
  }

  var _extendComment = function(comment) {
    comment.upvote = function() {
      this.votes++;
    };
    comment.downvote = function() {
      this.votes--;
    };

    comment.comments = function() {
      return this.commentIDs.map(find);
    }
  };
  
  var _updateRecentComments = function(comment) {
    if (_recentComments.length === 3) {
      _recentComments.splice(-1, 1);
    }
    _recentComments.unshift(comment);
    console.log(comment)
  }
  
  var _nextID = function() {
    if (!_id) {
      if (_.isEmpty(_comments)) {
        return _id = 1
      } else {
        var ids = _.map(Object.keys(_comments), function(commentId) {
          return parseInt(commentId);
        });
        _id = _.max(ids);
      }
    }
    return _id + 1
  };

  var _incrementID = function() {
    _id++;
  }

  var _limitThree = function(collection) {

    // object with date key, array value

    var recentCommentIDs = [];
    var dates = _.sortBy(Object.keys(collection), function(date) {
      return date;
    }).reverse();
    for (var i = 0; i < dates.length; i++) {
      var date = dates[i];
      for (var j = 0; j < collection[date].length; j++) {
        recentCommentIDs.push(collection[date][j]);
        if (recentCommentIDs.length === 3) { break }
      }
      if (recentCommentIDs.length === 3) { break }
    }
    console.log(recentCommentIDs)
    return recentCommentIDs;
  }

  return {
    recent: recent,
    create: create,
    find: find
  }
}]);