
angular.module('quizApp')
.controller('mainCtrl', mainController);

mainController.$inject = ['$scope', 'authenticationFactory', '$rootScope', '$location'];
function mainController($scope, authenticationFactory, $rootScope, $location) {
    $scope.isLogged = authenticationFactory.isLogged();
    $scope.logout = function() {
        authenticationFactory.logout();
        $scope.isLogged = false;
        $location.path('/');
    }
    $rootScope.$on('loginSuccess', function() {
        $scope.isLogged = true;
    });
}