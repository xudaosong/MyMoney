(function () {
    'use strict';
    angular
        .module('money')
        .config(config);
    function config ($dropdownProvider) {
        angular.extend($dropdownProvider.defaults, {
            html: true
        });
    }
})();