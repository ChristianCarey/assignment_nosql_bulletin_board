BB.directive('comment', function() {
  return {
    restrict: 'E',
    scope: {
      comment: '=',
      submitHandler: '&'
    },
    templateUrl: '/js/directives/commentTemplate.html'
  }
})