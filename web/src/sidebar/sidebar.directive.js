(function () {
    'use strict';

    angular
        .module('money.sidebar')
        .directive('moneySidebar', moneySidebar);

    moneySidebar.$inject = ['$window'];

    /* @ngInject */
    function moneySidebar($window) {
        // Usage:
        // 
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'EA',
            scope:{},
            templateUrl: 'sidebar/sidebar.view.html',
            controller: 'SidebarController',
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
})();