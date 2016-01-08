(function () {
    'use strict';
    angular
        .module('money.common')
        .factory('config', config);

    config.$inject = [];

    /* @ngInject */
    function config() {
        var service = {
            checklist:{
                authors:[
                    '许道松',
                    '王宁',
                    '王晓'
                ],
                group:[
                    '买入',
                    '卖出',
                    '选股'
                ]
            }
        };
        return service;
    }
})();