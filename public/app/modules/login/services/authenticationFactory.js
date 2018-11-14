angular.module('quizApp')
.factory('authenticationFactory', authenticationFactory);

authenticationFactory.$inject = ['$rootScope'];
function authenticationFactory($rootScope) {
    const authenticationFactoryObject = {
        login,
        isLogged,
        logout
    }

    return authenticationFactoryObject;

    function login(user) {
        if(user.email === 'arun32me@gmail.com' && user.password === '5851') {
            let uid = Math.floor((Math.random() * 100000000) + 1);
            sessionStorage.setItem('userInfo', JSON.stringify({id: uid, email: login.email}));
            console.log('Authenticated...!');
            $rootScope.$broadcast('loginSuccess');
            return true;
        } else {
            return false;
        }
    }
    function isLogged() {
        return sessionStorage.getItem('userInfo')?true:false;
    }
    function logout() {
        sessionStorage.clear('userInfo');
    }
}