BB.controller('PostsCtrl', ['$scope', 'postsService', 'commentsService', '_',
  function($scope, postsService, commentsService, _) {

    $scope.posts = {};

    postsService.getAll().then(function(posts) {
      // console.log(posts)
      _.each(posts, function(post, id) {
        _extendPost(post);
      });
      // console.log(posts['1'].comments());
      // angular.copy(posts, $scope.posts);
      // TODO I CHANGED THIS
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
      console.log('comments', $scope.posts['1'].comments())
      console.log('comment ids', $scope.posts['1'].commentIDs)
    }

    var _extendPost = function(post) {
      post.comments = function() {
        return post.commentIDs.map(commentsService.find);
      }
    }

  }]);