(function () {
    'use strict';
    angular
        .module('money.common')
        .factory('authentication', authentication);

    authentication.$inject = ['$window'];

    /* @ngInject */
    function authentication($window) {
        var service = {
            user: $window.user
        };
        return service;

        ////////////////


    }
})();