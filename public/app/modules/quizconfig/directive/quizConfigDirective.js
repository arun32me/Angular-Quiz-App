angular.module('quizApp')
.directive('quizConfigDirective', quizConfigDirective);

quizConfigDirective.$inject = ['getQuestFactory', 'ipcMain', '$location'];
function quizConfigDirective(getQuestFactory, ipcMain, $location) {

    const quizConfigObject = {
        link: link,
        templateUrl: 'app/views/quizConfigTemplate.html'
    }

    return quizConfigObject;

    function link(scope, element, attr) {

        scope.config = {
            topic : '21'
        }

        scope.startQuiz = async function() {
            
            let data = await getQuestFactory.get(scope.config.topic);
            if(data.response_code === 0) {
                if(data.results.length > 0) {
                    ipcMain.set('questData', data.results);
                    $location.url('/quiz');
                } else {
                    console.log('Error: no questions');
                }
            } else {
                console.log('error response from api');
            }
            scope.$apply();
        }
    }

}