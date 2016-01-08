(function () {
    'use strict';
    angular
        .module('money.common')
        .factory('authentication', authentication);

    authentication.$inject = [];

    /* @ngInject */
    function authentication() {
        var service = {
            user: null,
            isLogin: isLogin
        };
        return service;

        ////////////////
        function isLogin() {
            return !!service.user;
        }

    }
})();