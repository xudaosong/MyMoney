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
            title: '文章管理',
            items: [{
                title: '直播室',
                href: 'voiceBroadcast'
            }, {
                title: '文章',
                href: 'article'
            }]
        },{
            title: 'Checklist',
            items: [{
                title: 'Checklist',
                href: 'checklist'
            }]
        }];

    }
})();