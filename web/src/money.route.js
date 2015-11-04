(function () {
    'use strict';
    angular
        .module('money')
        .run(webRun);

    webRun.$inject = ['routerHelper'];
    /* @ngInject */
    function webRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'index',
            config: {
                url: '',
                templateUrl: 'voice-broadcast/voice-broadcast-list.view.html',
                controller: 'VoiceBroadcastController',
                controllerAs: 'vm'
            }
        }];
    }
})();