BB.controller('PostsCtrl', ['$scope', 'postsService', 'commentsService', '_',
  function($scope, postsService, commentsService, _) {

    postsService.getAll().then(function(posts) {
      $scope.posts = posts;
    })

    $scope.createComment = function(form, params, postID) {
      if (!form.$valid) { return }
      var comment = angular.copy(params);
      comment.postID = postID;
      comment = commentsService.create(comment);
      params.author.name = null;
      params.content = null;
      form.$setPristine();
    }

  }]);