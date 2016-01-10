(function() {
    'use strict';
    angular
        .module('money.priceRatio')
        .run(webRun);
    webRun.$inject = ['routerHelper'];
    /* @ngInject */
    function webRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'priceRatio',
            config: {
                url: '/priceRatio',
                templateUrl: 'price-ratio/price-ratio.view.html',
                controller: 'PriceRatioController',
                controllerAs: 'vm',
                fsBreadcrumb: {
                    label: '涨跌比率'
                }
            }
        }];
    }
})();