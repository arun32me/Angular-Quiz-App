
angular.module('quizApp')
.directive('loginDirective', loginDirective);

function loginDirective() {
    return {
        templateUrl: 'app/views/loginTemplate.html'
    }
}