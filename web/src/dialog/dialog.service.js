(function () {
    'use strict';
    angular
        .module('money.dialog')
        .factory('dialog', dialog);

    dialog.$inject = ['$modal'];

    /* @ngInject */
    function dialog($modal) {
        var service = {
            alert: alert,
            error:error,
            confirm: confirm
        };
        return service;

        ////////////////
        function alert(content) {
            $modal({
                title: '提示',
                content: content,
                templateUrl: 'dialog/alert.dialog.view.html',
                show: true,
                animation: 'fs-zoom'
            });
        }

        function error(content){
            $modal({
                title: '错误',
                content: content,
                templateUrl: 'dialog/error.dialog.view.html',
                show: true,
                animation: 'fs-zoom'
            });
        }

        function confirm(content, confirmFn, cancelFn) {
            $modal({
                title: '请确定',
                content: content,
                controller: function () {
                    var vm = this;
                    vm.confirmFn = confirmFn || angular.noop;
                    vm.cancelFn = cancelFn || angular.noop;
                },
                controllerAs: 'vm',
                templateUrl: 'dialog/confirm.dialog.view.html',
                show: true,
                animation: 'fs-zoom'
            });
        }
    }

    function ConfirmController() {

    }
})();