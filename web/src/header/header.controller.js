(function () {
    'use strict';

    angular
        .module('money.header')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', '$element', '$attrs', '$transclude','authentication'];

    /* @ngInject */
    function HeaderController($scope, $element, $attrs, $transclude,authentication) {
        /* jshint validthis: true */
        var vm = this;
        vm.authentication = authentication;
        vm.dropdown = [
            {text: '<i class="fa fa-pencil-square-o"></i>&nbsp;个人信息修改', href: '#info'},
            {text: '<i class="fa fa-sign-out"></i>&nbsp;退出', click: 'vm.authentication.logout()'}
        ];
    }
})();