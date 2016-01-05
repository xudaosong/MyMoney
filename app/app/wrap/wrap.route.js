(function() {
    'use strict';
    angular
        .module('money.checklist')
        .run(webRun);
    webRun.$inject = ['routerHelper'];
    /* @ngInject */
    function webRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'tabs',
            config: {
              url: '/tabs',
              abstract: true,
              templateUrl: 'wrap/tabs.view.html'
            }
        }];
    }
})();
