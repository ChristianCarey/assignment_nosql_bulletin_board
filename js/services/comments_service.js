BB.factory('commentsService', ['$http', 'postsService', '_', function($http, postsService, _) {
  
  var _comments = {},
      _id;

  $http.get('/data/comments.json').then(function(response){
    angular.copy(response.data, _comments);
  })

  var recent = function() {
    return $http.get('/data/comments_by_date.json').then(function(response) {
      return findBatch(_limitThree(response.data));
    });
  }

  var find = function(id) {
    return _comments[id];
  }

  var findBatch = function(ids) {
    return ids.map(find);
  }

  var create = function(comment) {
    comment.created_at = new Date();
    comment.votes = 0;
    comment.id = _nextID();
    // return $http.post('/data/comments.json', comment).then(function(response) {
      // return response.data;
    // });
    postsService.addComment(comment);
    _comments[comment.id] = comment;
    _incrementID();
    return _comments[comment.id];
  }

  var _updatePost = function(comment) {
  };

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
    console.log(dates)
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
    create: create
  }
}]);