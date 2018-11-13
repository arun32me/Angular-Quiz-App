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
            var start = questNo;
            questNo += 1;
            if(questNo === questData.length - 1) {
                scope.options.finish = true;
                
            }
            if(questNo === questData.length) {
                questNo = 0;
            }
            if(scope.options.viewSkipped) {
                console.log('skip loop begin');
                var i = questNo;
                while(true) {
                    if(questData[i].selected == 'null') {
                        console.log('found');
                        questNo = i;
                        init();
                        break;
                    }
                    console.log('skipped');
                    if(i === start) {
                        console.log('start point reached');
                        break;
                    }
                    if(i === questData.length - 1) {
                        console.log('end of array loop');
                        i = 0;
                    }
                    i++;
                }
            } else {
                init();
            }
        }
        scope.previousQuestion = function() {
            var start = questNo;
            questNo -= 1;
            if(questNo < 0) {
                scope.options.finish = true;
            }
            if(questNo < 0) {
                questNo = questData.length - 1;
            }
            if(scope.options.viewSkipped) {
                console.log('skip loop begin');
                var i = questNo;
                while(true) {
                    if(questData[i].selected == 'null') {
                        console.log('found');
                        questNo = i;
                        init();
                        break;
                    }
                    console.log('skipped');
                    if(i === start) {
                        console.log('start point reached');
                        break;
                    }
                    if(i <= 0) {
                        console.log('end of array loop');
                        i = questData.length - 1;
                    }
                    i--;
                }
            } else {
                init();
            }
        }
        scope.toggleViewSkipped = function() {
            scope.options.viewSkipped = !scope.options.viewSkipped;
        }
    }
}