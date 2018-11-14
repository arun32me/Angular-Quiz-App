angular.module('quizApp')
.directive('quizMainDirective', quizMainDirective);

quizMainDirective.$inject = ['$location', 'ipcMain', '$rootScope'];
function quizMainDirective($location, ipcMain, $rootScope) {

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
        scope.warnMsg = false;
        scope.finish = function() {
            $('#exampleModal').modal('hide');
            
                for(let i = 0; i < questData.length; i++) {
                    if(questData[i].selected === 'null' && scope.warnMsg === false) {
                        scope.warnMsg = true;
                        let err = {
                            scope: scope,
                            msg: "You have skipped one or more questions. Please close this window if you want to check them out."
                        }
                        $rootScope.$broadcast('errorMessage', err);
                        return true;
                    }
                    if(i === questData.length - 1) {
                        scope.warnMsg = true;
                        break;
                    }
                }
            if(scope.warnMsg === true) {
                ipcMain.set('result', questData);
                $location.path('/result');
            }
            return false;
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
                var i = questNo;
                while(true) {
                    if(questData[i].selected == 'null') {
                        questNo = i;
                        init();
                        break;
                    }
                    
                    if(i === start) {
                        break;
                    }
                    if(i === questData.length - 1) {
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
                questNo = questData.length - 1;
            }
            if(scope.options.viewSkipped) {
                var i = questNo;
                while(true) {
                    if(questData[i].selected == 'null') {
                        questNo = i;
                        init();
                        break;
                    }
                    if(i === start) {
                        break;
                    }
                    i -= 1;
                    if(i <= 0) {
                        i = questData.length - 1;
                    }
                }
            } else {
                init();
            }
        }
        scope.toggleViewSkipped = function(stat = false) {
            if(stat) {
                scope.options.viewSkipped = stat;
            } else {
                scope.options.viewSkipped = !scope.options.viewSkipped;
            }
            if(scope.options.viewSkipped) {
                if(questData[questNo].selected != 'null') {
                    scope.nextQuestion();
                }
            }
        }
    }
}