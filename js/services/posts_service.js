BB.factory('postsService', ['$http', function($http) {
  var _posts = [];

  var getAll = function() {
    return $http.get('/data/posts.json')
      .then(function(response) {
        _posts = response.data;
        return response.data;
      })
    ;
  }

  var addComment = function(comment) {
    var post = _find(comment.postID);
    post.comments.push(comment);
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