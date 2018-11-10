
angular.module('quizApp')
.directive('userHomeDirective', userHomeDirective);

function userHomeDirective() {
    return {
        templateUrl: 'app/views/userHomeTemplate.html'
    }
}