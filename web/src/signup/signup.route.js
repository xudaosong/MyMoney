(function () {
    'use strict';
    angular
        .module('money.signup')
        .run(webRun);
    webRun.$inject = ['routerHelper'];
    /* @ngInject */
    function webRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'signup',
            config: {
                url: '/signup',
                templateUrl: 'signup/signup.view.html',
                controller: 'SignupController',
                controllerAs: 'vm'
            }
        }];
    }
})();