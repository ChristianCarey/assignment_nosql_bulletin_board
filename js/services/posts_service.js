BB.factory('postsService', ['$http', function($http) {
  var _posts = [];

  var getAll = function() {
    return $http.get('/data/posts.json')
      .then(function(response) {
        _posts = response;
        return response;
      })
    ;
  }
}]); 