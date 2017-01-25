BB.factory('commentByDateService', function() {

  var _commentsByDate = {};

  $http.get('/data/comments_by_date.json').then(function(response) {
    angular.copy(response.data, _commentsByDate);
  })
  
  var addComment = function(comment) {
    // if date exists, store at date
    if (_commentsByDate[comment.createdAt])
    //
  }
});