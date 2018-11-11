angular.module('quizApp')
.directive('quizMainDirective', quizMainDirective);

quizMainDirective.$inject = ['$location', 'ipcMain'];
function quizMainDirective($location, ipcMain) {

    const quizMainObject = {
        templateUrl: 'app/views/quizMainTemplate.html',
        link: link
    }

    return quizMainObject;

    function link(scope, element, attr) {
        const questData = ipcMain.get('questData');
        if(questData) {
            console.log(questData);
        } else {
            $location.path('/userhome');
        }
    }
}