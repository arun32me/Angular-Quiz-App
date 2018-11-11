angular.module('quizApp')
.directive('resultDirective', resultDirective);

resultDirective.$inject = ['ipcMain', '$location'];
function resultDirective(ipcMain, $location) {

    resultObject = {
        link: link,
        templateUrl: 'app/views/resultViewTemplate.html'
    }

    return resultObject;

    function link(scope, element, attr) {
        let resultShteet = ipcMain.get('result');
        if(resultShteet) {
            scope.score = getScore();
        } else {
            $location.path('/userhome');
        }

        function getScore() {
            let score = 0;
    
            for(let i = 0; i < resultShteet.length; i++) {
                if(resultShteet[i].ans === resultShteet[i].selected) {
                    score++;
                }
            }
    
            return score;
        }
    }
}