(function() {
    'use strict';
    angular
        .module('money.common')
        .factory('authentication', authentication);

    authentication.$inject = ['$window'];

    /* @ngInject */
    function authentication($window) {
        var service = {
            user: null,
            isLogin: isLogin,
            logout: logout
        };
        if ($window.sessionStorage.user) {
            service.user = angular.fromJson($window.sessionStorage.user);
        }
        return service;

        ////////////////
        function isLogin() {
            return !!service.user;
        }

        function logout() {
            delete $window.sessionStorage.user;
            $window.location.href = '/';
        }
    }
})();
