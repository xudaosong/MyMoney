(function () {
    'use strict';
    angular
        .module('money')
        .config(config);
    function config(RestangularProvider, $dropdownProvider, $datepickerProvider,$breadcrumbProvider, fsPaginationConfig) {
        //=== RestangularProvider
        RestangularProvider.setBaseUrl('/api');
        RestangularProvider.setRestangularFields({
            id: "_id"
        });
        RestangularProvider.addResponseInterceptor(function (data, operation) {
            var extractedData;
            if (operation === "getList") {
                extractedData = data.data;
                extractedData.total = data.total;
            } else {
                extractedData = data;
            }
            return extractedData;
        });
        //==== $dropdownProvider
        angular.extend($dropdownProvider.defaults, {
            html: true
        });
        //==== fsPaginationConfig
        fsPaginationConfig.previousText = "上一页";
        fsPaginationConfig.nextText = "下一页";
        fsPaginationConfig.firstText = "首页";
        fsPaginationConfig.lastText = "尾页";
        //==== $datepickerProvider
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'yyyy-MM-dd',
            startWeek: 1,
            autoclose: true,
            iconLeft: 'fa fa-chevron-left',
            iconRight: 'fa fa-chevron-right'
        });
        //==== $breadcrumbProvider
        $breadcrumbProvider.setOptions({
            prefixStateName: 'home',
            templateUrl: 'breadcrumbs/breadcrumbs.view.html'
        });
    }
})();