BB.factory('postsService', ['$http', '_' , function($http, _) {
  var _posts = {};

  var getAll = function() {
    return $http.get('/data/posts.json')
      .then(function(response) {
        angular.copy(response.data, _posts)
        return _posts;
      })
    ;
  }

  var addComment = function(comment) {
    var post = _find(comment.postID);
    post.commentIDs.push(comment.id);
  };

  var _find = function(id) {
    return _posts[id];
  };

  getAll();

  return {
    getAll: getAll,
    addComment: addComment
  }
}]); 