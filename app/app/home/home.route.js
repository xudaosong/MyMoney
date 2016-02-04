(function() {
    'use strict';
    angular
        .module('money.home')
        .run(webRun);
    webRun.$inject = ['routerHelper'];
    /* @ngInject */
    function webRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'home',
            config: {
                url: '/',
                templateUrl: 'home/home.view.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            }
        }];
    }
})();
