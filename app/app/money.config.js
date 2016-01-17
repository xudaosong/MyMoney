(function() {
    'use strict';
    angular
        .module('money')
        .config(config);

    config.$inject = ['RestangularProvider'];

    function config(RestangularProvider) {
        //=== RestangularProvider
        RestangularProvider.setBaseUrl('http://api.money.dev/api');
        if(!!window.sessionStorage.token){
            RestangularProvider.setDefaultHeaders({Authorization: "Bearer " + window.sessionStorage.token});
        }
        RestangularProvider.setRestangularFields({
            id: "_id"
        });
        RestangularProvider.addResponseInterceptor(function(data, operation) {
            var extractedData;
            if (operation === "getList") {
                extractedData = data.data;
                extractedData.total = data.total;
            } else {
                extractedData = data;
            }
            return extractedData;
        });
    }
})();