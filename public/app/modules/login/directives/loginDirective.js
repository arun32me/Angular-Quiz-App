
angular.module('quizApp')
.directive('loginDirective', loginDirective);

// loginDirective.$inject = [];
function loginDirective() {
    return {
        templateUrl: 'app/views/loginTemplate.html',
        link: link
    }
    function link(scope, elemetnt, attr) {
        function init() {
            scope.user = {
                email: 'arun',
                password: '',
                remember: false
            }
        }
        init();
        scope.auth = function() {

        }
    }
}