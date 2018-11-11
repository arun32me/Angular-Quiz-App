
angular.module('quizApp')
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        template: '<login-directive></login-directive>'
    })
    .when('/userhome', {
        template: '<user-home-directive></user-home-directive>'
    })
    .when('/quizconfig', {
        template: '<quiz-config-directive></quiz-config-directive>'
    })
    .when('/quiz', {
        template: '<quiz-main-directive></quiz-main-directive>'
    })
    .when('/result', {
        template: '<result-directive></result-directive>'
    })
    .otherwise({
        redirectTo: '/'
    })
}]);