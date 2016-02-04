(function() {
    'use strict';

    angular
        .module('money.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = [];

    /* @ngInject */
    function HomeController() {
        /* jshint validthis: true */
        var vm = this;
        vm.list = [{
            'name': 'checklist',
            'icon': 'ion-umbrella',
            'href': 'checklist'
        }, {
            'name': '我的交易',
            'icon': 'ion-ios-flower',
            'href': 'home'
        }, {
            'name': '我的消费',
            'icon': 'ion-bag',
            'href': 'home'
        }, {
            'name': '我的财务',
            'icon': 'ion-cash',
            'href': 'home'
        }, {
            'name': '我的笔记',
            'icon': 'ion-ios-compose',
            'href': 'home'
        }, {
            'name': '我的设置',
            'icon': 'ion-gear-a',
            'href': 'home'
        }];
        activate();

        ////////////////

        function activate() {

        }
    }
})();
