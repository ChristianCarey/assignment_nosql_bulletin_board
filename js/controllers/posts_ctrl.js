BB.controller('PostsCtrl', ['$scope', 'postsService', 'commentsServcice', '_',
  function($scope, postsService, commentsService, _) {

    postsService.getAll().then(function(response) {
      $scope.posts = response.data;
    })

    $scope.createComment = function(form, postID) {
      if (!form.$valid) { return }
      var comment = angular.copy($scope.comment);
      comment.postID = postID;
      commentsService.create(comment).then(function(newComment) {
        $scope.posts[postID].comments.push(newComment);
      })
    }

  }]);