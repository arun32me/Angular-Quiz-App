
angular.module('quizApp')
.controller('mainCtrl', mainController);

mainController.$inject = ['$scope', 'authenticationFactory', '$rootScope', '$location'];
function mainController($scope, authenticationFactory, $rootScope, $location) {
    $scope.errorMessage = "";
    $scope.isLogged = authenticationFactory.isLogged();
    $scope.logout = function() {
        authenticationFactory.logout();
        $scope.isLogged = false;
        $location.path('/');
    }
    $rootScope.$on('loginSuccess', function() {
        $scope.isLogged = true;
    });
    $rootScope.$on('errorMessage', function(event, errorMessage) {
        $scope.errorMessage = errorMessage.msg;
        $scope.locScope = errorMessage.scope;
        $('#exampleModal').modal('show');
    })
}