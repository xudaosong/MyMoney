(function () {
    'use strict';
    angular
        .module('money.login')
        .controller('LoginController', LoginController);
    LoginController.$inject = ['$scope', 'Restangular', '$window', 'authentication'];
    /* @ngInject */
    function LoginController($scope, Restangular, $window, authentication) {
        var vm = this,
            login = Restangular.all('login');
        vm.doLogin = doLogin;
        ////////////////////////////
       
        function doLogin(user) {
            login.post(user).then(function (res) {
                authentication.user = res.user;
                $window.location.href = 'index.html';
            }, function (res) {
                alert(res.data.message);
            });
        }
    };
})();