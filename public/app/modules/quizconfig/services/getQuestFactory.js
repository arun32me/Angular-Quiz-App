angular.module('quizApp')
.factory('getQuestFactory', getQuestFactory);

getQuestFactory.$inject = ['$rootScope','$http'];
function getQuestFactory($rootScope, $http) {

    const getQuestObject = {
        get
    }

    return getQuestObject;

    function get(topic) {
        const url = `https://opentdb.com/api.php?amount=10&category=${topic}&type=multiple`;
        

        return new Promise(function(resolve, reject) {
            fetch(url).then(function(response) {
                response.json().then(function(data) {
                    resolve(data);
                });
            }).catch(function(err) {
                reject(null);
            })
        });
    }
}