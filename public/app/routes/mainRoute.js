
angular.module('quizApp')
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        template: '<login-directive></login-directive>',
        access: true
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
}])
.run(['$rootScope', '$location', 'authenticationFactory', function($rootScope, $location, authenticationFactory) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        if(!nextRoute.access) {
            if(!authenticationFactory.isLogged()) {
                $location.path('/login');
            }
        }else if(authenticationFactory.isLogged() && nextRoute.$$route.originalPath === '/') {
            $location.path('/userhome');
            // $location.path(currentRoute.$$route.originalPath);
        }
    });
}]);