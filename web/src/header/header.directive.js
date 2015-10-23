(function () {
    'use strict';

    angular
        .module('money.header')
        .directive('moneyHeader', moneyHeader);

    moneyHeader.$inject = ['$window'];

    /* @ngInject */
    function moneyHeader($window) {
        // Usage:
        // 
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'EA',
            scope:{},
            templateUrl: 'header/header.view.html',
            controller: 'HeaderController',
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
})();