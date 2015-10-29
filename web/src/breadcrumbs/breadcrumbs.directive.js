(function () {
    'use strict';

    angular
        .module('money.breadcrumbs')
        .directive('moneyBreadcrumbs', moneyBreadcrumbs);

    moneyBreadcrumbs.$inject = ['$window'];

    /* @ngInject */
    function moneyBreadcrumbs($window) {
        // Usage:
        // 
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'EA',
            replace:true,
            scope:{},
            templateUrl: 'breadcrumbs/breadcrumbs.view.html',
            controller: 'BreadcrumbsController',
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
})();