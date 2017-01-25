BB.controller('PostsCtrl', ['$scope', 'postsService', '_',
  function($scope, postsService, _) {

    postsService.getAll().then(function(response) {
      $scope.posts = response.data;
    })

  }]);