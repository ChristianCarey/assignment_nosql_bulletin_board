BB.controller('RecentCommentsCtrl', ['$scope', 'commentsService', 
  function($scope, commentsService) {

    $scope.recentComments = commentsService.recent();
    
  }]);