(function () {
    'use strict';
    angular
        .module('money.login')
        .controller('LoginController', LoginController);
    LoginController.$inject = ['$scope', 'Restangular', '$window'];
    /* @ngInject */
    function LoginController($scope, Restangular, $window) {
        var vm = this,
            login = Restangular.all('login');
        vm.doLogin = doLogin;
        ////////////////////////////
       
        function doLogin(user) {
            login.post(user).then(function () {
                $window.location.href = '/';
            }, function (res) {
                alert(res.data.message);
            });
        }
    };
})();