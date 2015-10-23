(function () {
    'use strict';
    angular
        .module('money.signup')
        .factory('signup', signup);

    signup.$inject = ['$http'];

    /* @ngInject */
    function signup($http) {
        var service = {
            create: create
        };

        return service;

        ////////////////

        function create(data) {
            return $http({
                method:'POST',
                url:'/signup',
                data:$.param(data),
                headers:{'Content-Type':'application/x-www-form-urlencoded'}
            });
        }

    }
})();