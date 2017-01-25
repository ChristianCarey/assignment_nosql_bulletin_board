BB.factory('commentsService', ['$http', function($http) {
  
  var _comments = {};

  $http.get('/data/comments.json').then(function(response){
    angular.copy(response.data, _comments);
  })

  var recent = function() {
    return $http.get('/data/comments_by_date.json').then(function(response) {
      return _limitThree(findBatch(response.data));
    });
  }

  var find = function(id) {
    return _comments[id];
  }

  var findBatch = function(ids) {
    return ids.map(find);
  }

  var _limitThree = function(collection) {
    var recentComments = [];
    for (var i = 0; i < collection.length; i++) {
      var date = collection[i];
      for (var j = 0; j < date.commentIds.length; j++) {
        recentComments.push(date.commentIds[j]);
        if (recentComments.length === 3) { break }
      }
      if (recentComments.length === 3) { break }
    }
    return recentComments;
  }

  return {
    recent: recent
  }
}]);