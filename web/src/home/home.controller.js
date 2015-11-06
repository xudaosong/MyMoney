(function () {
    'use strict';

    angular
        .module('money.header')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['Restangular'];

    /* @ngInject */
    function HomeController(Restangular) {
        /* jshint validthis: true */
        var vm = this;
        ////////////////
    }
})();