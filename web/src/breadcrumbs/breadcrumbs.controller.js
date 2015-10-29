(function () {
    'use strict';

    angular
        .module('money.breadcrumbs')
        .controller('BreadcrumbsController', BreadcrumbsController);

    BreadcrumbsController.$inject = ['$scope', '$element', '$attrs', '$transclude'];

    /* @ngInject */
    function BreadcrumbsController($scope, $element, $attrs, $transclude) {
        /* jshint validthis: true */
        var vm = this;
        vm.dropdown = [
            {text: '<i class="fa fa-pencil-square-o"></i>&nbsp;个人信息修改', href: '#info'},
            {text: '<i class="fa fa-sign-out"></i>&nbsp;退出', href: '/singout'}
        ];
    }
})();