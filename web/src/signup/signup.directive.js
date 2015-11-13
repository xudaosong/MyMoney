(function () {
    'use strict';

    angular
        .module('money.signup')
        .directive('moneySignup', moneySignup);

    moneySignup.$inject = ['$window'];

    /* @ngInject */
    function moneySignup() {
        // Usage:
        // 
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'EA',
            scope:{},
            templateUrl: 'signup/signup.view.html',
            controller: 'SignupController',
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
})();