BB.controller('PostsCtrl', ['$scope', 'postsService', 'commentsService', '_',
  function($scope, postsService, commentsService, _) {

    postsService.getAll().then(function(posts) {
      _.each(posts, function(post, id) {
        _extendPost(post);
      });
      console.log(posts['1'].comments());
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

    var _extendPost = function(post) {
      post.comments = function() {
        return post.commentIDs.map(commentsService.find);
      }
      console.log(post)
    }

  }]);