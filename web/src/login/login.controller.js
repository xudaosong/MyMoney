(function() {
    'use strict';
    angular
        .module('money.login')
        .controller('LoginController', LoginController);
    LoginController.$inject = ['$scope', 'Restangular', '$window', 'authentication', '$state'];
    /* @ngInject */
    function LoginController($scope, Restangular, $window, authentication, $state) {
        var vm = this,
            login = Restangular.all('login');
        vm.doLogin = doLogin;
        ////////////////////////////

        function doLogin(user) {
            login.post(user).then(function(res) {
                authentication.user = res;
                $window.sessionStorage.user = angular.toJson(res);
                Restangular.setDefaultHeaders({
                    Authorization: "Bearer " + res.token
                });
                $state.go('home');
            }, function(res) {
                alert(res.data.message);
            });
        }
    };
})();
