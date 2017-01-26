BB.controller('PostsCtrl', ['$scope', 'postsService', 'commentsService', '_',
  function($scope, postsService, commentsService, _) {

    $scope.posts = {};

    postsService.getAll().then(function(posts) {
      console.log(posts)
      _.each(posts, function(post, id) {
        _extendPost(post);
      });
      // console.log(posts['1'].comments());
      // angular.copy(posts, $scope.posts);
      // TODO I CHANGED THIS
      $scope.posts = posts;
    })

    $scope.createComment = function(form, params, commentableID, commentableType) {
      if (!form.$valid) { return }
      var comment = angular.copy(params);
      comment.commentable = {
        id: commentableID,
        type: commentableType
      };
      comment = commentsService.create(comment);
      params.author.name = null;
      params.content = null;
      form.$setPristine();
      console.log($scope.posts['1'].comments())
    }

    var _extendPost = function(post) {
      post.comments = function() {
        return post.commentIDs.map(commentsService.find);
      }
    }

  }]);