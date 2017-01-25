BB.controller('RecentCommentsCtrl', ['$scope', 'commentsService', 
  function($scope, commentsService) {

    commentsService.recent().then(function(response) {
      $scope.recentComments = response;
    });

    

  }]);