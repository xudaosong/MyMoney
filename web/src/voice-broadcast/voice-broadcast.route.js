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
                templateUrl: 'voice-broadcast/voice-broadcast-list.view.html',
                controller: 'VoiceBroadcastController',
                controllerAs: 'vm',
                fsBreadcrumb: {
                    label: '直播室'
                }
            }
        },{
            state: 'voiceBroadcast.create',
            config: {
                url:'/create',
                views:{
                    '@':{
                        templateUrl: 'voice-broadcast/voice-broadcast-create.view.html',
                        controller: 'VoiceBroadcastController',
                        controllerAs: 'vm'
                    }
                },
                fsBreadcrumb: {
                    label: '新增直播文章'
                }
            }
        }];
    }
})();