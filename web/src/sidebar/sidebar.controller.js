(function () {
    'use strict';

    angular
        .module('money.sidebar')
        .controller('SidebarController', SidebarController);
    SidebarController.$inject = ['$scope', '$element', '$attrs', '$transclude'];
    /* @ngInject */
    function SidebarController($scope, $element, $attrs, $transclude) {
        /* jshint validthis: true */
        var vm = this;
        vm.panes = [{
            title: '企业招聘',
            items: [{
                title: '招聘信息发布管理',
                href: 'voiceBroadcast'
            }, {
                title: '职位申请信息管理',
                href: 'index'
            }]
        },{
            title: '企业招聘',
            items: [{
                title: '招聘信息发布管理',
                href: 'index'
            }, {
                title: '职位申请信息管理',
                href: 'index'
            }]
        },{
            title: '企业招聘',
            items: [{
                title: '招聘信息发布管理',
                href: 'index'
            }, {
                title: '职位申请信息管理',
                href: 'index'
            }]
        }];

    }
})();