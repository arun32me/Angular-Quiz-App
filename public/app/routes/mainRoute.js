
angular.module('quizApp')
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        template: '<login-directive></login-directive>'
    })
    .when('/userhome', {
        template: '<user-home-directive></user-home-directive>'
    })
    .otherwise({
        redirectTo: '/'
    })
}]);