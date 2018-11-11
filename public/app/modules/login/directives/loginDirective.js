
angular.module('quizApp')
.directive('loginDirective', loginDirective);

loginDirective.$inject = ['authenticationFactory'];
function loginDirective(authenticationFactory) {
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
        scope.auth = function() {
            authenticationFactory.login(scope.user);
        }
    }
}