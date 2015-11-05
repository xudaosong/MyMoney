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
                controllerAs: 'vm'
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
                }
            }
        }];
    }
        /*.config(config)
    function config($stateProvider) {
        $stateProvider
            .state('voiceBroadcast', {
                url: '/voiceBroadcast',
                templateUrl: 'voice-broadcast/voice-broadcast.list.view.html'
            })
            //.state('voiceBroadcast.list',{
            //    url: '/list',
            //    templateUrl: 'voice-broadcast/voice-broadcast.list.view.html',
            //    controller: 'VoiceBroadcastController',
            //    controllerAs: 'vm'
            //})
            .state('voiceBroadcast.create', {
                url: '/create',
                templateUrl: 'voice-broadcast/voice-broadcast.create.view.html',
                controller: 'VoiceBroadcastController',
                controllerAs: 'vm'
            });

    }*/


})();