(function() {
    'use strict';
    angular
        .module('money')
        .config(config);

    config.$inject = ['RestangularProvider', 'ENV', '$ionicConfigProvider'];

    function config(RestangularProvider, ENV, $ionicConfigProvider) {
        $ionicConfigProvider.tabs.position("bottom");
        if (ionic.Platform.isAndroid()) {
            $ionicConfigProvider.views.transition('none')
            $ionicConfigProvider.scrolling.jsScrolling(false);
        }
        // $ionicConfigProvider.scrolling.jsScrolling(false);
        //=== RestangularProvider
        RestangularProvider.setBaseUrl(ENV.apiEndpoint + '/api');
        if (!!window.localStorage.token) {
            RestangularProvider.setDefaultHeaders({
                Authorization: 'Bearer ' + window.localStorage.token
            });
        }
        RestangularProvider.setRestangularFields({
            id: '_id'
        });
        RestangularProvider.addResponseInterceptor(function(data, operation) {
            var extractedData;
            if (operation === 'getList') {
                extractedData = data.data;
                extractedData.total = data.total;
            } else {
                extractedData = data;
            }
            return extractedData;
        });
    }
})();
