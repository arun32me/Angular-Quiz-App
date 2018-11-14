
angular.module('quizApp')
.directive('loginDirective', loginDirective);

loginDirective.$inject = ['authenticationFactory', '$location'];
function loginDirective(authenticationFactory, $location) {
    return {
        templateUrl: 'app/views/loginTemplate.html',
        link: link
    }
    function link(scope, elemetnt, attr) {
        function init() {
            scope.user = {
                email: 'arun32me@gmail.com',
                password: '5851',
                remember: false
            }
        }
        init();
        scope.loginErr = false;
        scope.auth = function() {
            if(authenticationFactory.login(scope.user)) {
                $location.path('/userhome');
            } else {
                scope.loginErr = true;
            }
        }
    }
}