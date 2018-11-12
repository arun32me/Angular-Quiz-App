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
        scope.options = {
            finish: false,
            viewSkipped: false
        }
        let questNo = 0;
        let viewSkippedOnly = false;
        const questData = ipcMain.get('questData');
       
        if(questData) {
            init();
        } else {
            $location.path('/userhome');
        }
        function init() {
            scope.quest = questData[questNo];
        }
        scope.finish = function() {
            ipcMain.set('result', questData);
            $location.path('/result');
        }
        scope.nextQuestion = function() {
            questNo += 1;
            if(questNo === questData.length - 1) {
                scope.options.finish = true;
                
            }
            if(questNo === questData.length) {
                questNo = 0;
            }
            if(scope.options.viewSkipped) {
                var start = questNo;
                for(let i = questNo; i < questData.length; i++) {
                    if(questData[i].selected == 'null') {
                        questNo = i;
                        init();
                        break;
                    }
                    if(i === questData.length - 1) {
                        console.log('end of array loop');
                        i = 0;
                    }
                    if(i != start) {
                        continue;
                    }
                    break
                    
                }
            } else {
                init();
            }
        }
        scope.previousQuestion = function() {
            if(questNo > 0) {
                --questNo;
                init();
            }
        }
        scope.toggleViewSkipped = function() {
            scope.options.viewSkipped = !scope.options.viewSkipped;
        }
    }
}