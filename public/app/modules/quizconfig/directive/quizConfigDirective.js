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
                    let qBook = prepareQuestion(data.results);
                    ipcMain.set('questData', qBook);
                    $location.url('/quiz');
                } else {
                    console.log('Error: no questions');
                }
            } else {
                console.log('error response from api');
            }
            scope.$apply();
        }
        function prepareQuestion(data) {
            let booklet = [];

            for(let i = 0; i < data.length; i++) {
                let question = {
                    questNo: i,
                    question: data[i].question,
                    options: getOptions(),
                    ans: data[i].correct_answer,
                    selected: 'null'
                }
                booklet.push(question);

                function getOptions() {
                    let op = [];
                    let r = Math.floor(Math.random() * 4);
                    for(let j = 0; j < 4; j++) {
                        if(j === r) {
                            op.push(data[i].correct_answer);
                            continue;
                        }
                        op.push(data[i].incorrect_answers[j]);
                    }
                    return op;
                }

            }
            return booklet;
        }
    }

}