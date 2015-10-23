(function () {
    'use strict';
    angular
        .module('money.voiceBroadcast')
        .factory('voiceBroadcast', voiceBroadcast);

    voiceBroadcast.$inject = ['$resource'];


/* @ngInject */

    function voiceBroadcast($resource) {

        return activate();

        ////////////////

        function activate() {
            return $resource('api/voiceBroadcast/:voiceBroadcastId', {
                voiceBroadcastId: '@_id'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }
    }
})();
