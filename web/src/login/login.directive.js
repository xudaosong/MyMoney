(function () {
    'use strict';

    angular
        .module('money.login')
        .directive('moneyLogin', moneyLogin);

    moneyLogin.$inject = ['$window'];

    /* @ngInject */
    function moneyLogin() {
        // Usage:
        // 
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'EA',
            templateUrl: 'login/login.view.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
})();