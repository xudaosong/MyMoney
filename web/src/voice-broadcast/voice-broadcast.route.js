(function () {
    'use strict';
    angular
        .module('money.voiceBroadcast')
        .run(webRun);

    webRun.$inject = ['routerHelper'];
    /* @ngInject */
    function webRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'voiceBroadcast',
            config: {
                url: '/voiceBroadcast',
                templateUrl: 'voice-broadcast/list-voice-broadcast.view.html',
                controller: 'VoiceBroadcastController',
                controllerAs: 'vm'
            }
        },{
            state: 'create',
            config: {
                url:'/voiceBroadcast/create',
                templateUrl: 'voice-broadcast/create-voice-broadcast.view.html',
                controller: 'VoiceBroadcastController',
                controllerAs: 'vm'
            }
        }];
    }
})();