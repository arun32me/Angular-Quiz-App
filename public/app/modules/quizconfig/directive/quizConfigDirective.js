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

        scope.config = [
            {
                id: '21',
                subject: 'Sports',
                selected: false
            },
            {
                id: '9',
                subject: 'General Knowledge',
                selected: false
            },
            {
                id: '17',
                subject: 'Science',
                selected: false
            },
            {
                id: '27',
                subject: 'Animals',
                selected: false
            }
        ];

        scope.startQuiz = async function() {
            scope.loadingScreen = true;
            let data;
            let category = [];
            for(let i = 0; i < scope.config.length; i++) {
                if(scope.config[i].selected) {
                    category.push(getQuestFactory.get(scope.config[i].id));
                }
            }
            if(category.length === 0) {
                console.log('No items selected!');
                scope.loadingScreen = false;
                return 0;
            }
            await Promise.all(category).then(function(values) {
                data = values;
            });
                if(data.length > 0) {
                    let qBook = prepareQuestion(data);
                    ipcMain.set('questData', qBook);
                    $location.url('/quiz');
                } else {
                    console.log('Error: no questions');
                }
           scope.$apply();
        }
        function prepareQuestion(dataset) {
            let booklet = [];
            for(let k = 0; k < dataset.length; k++) {
                let data = dataset[k].results;
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
                    let t = 0;
                    let r = Math.floor(Math.random() * 4);
                    for(let j = 0; j < 4; j++) {
                        if(j === r) {
                            op.push(data[i].correct_answer);
                            t = 1;
                            continue;
                        }
                        op.push(data[i].incorrect_answers[j - t]);
                    }
                    return op;
                }
            }
        }
            return booklet;
        }
    }
}