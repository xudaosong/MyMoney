//(function () {
//    'use strict';
//
//    angular
//        .module('money', ['ui.router', 'fish', 'money.views'])
//        .config(function ($locationProvider,$stateProvider,$urlRouterProvider) {
//            $locationProvider.hashPrefix('!');
//
//            $stateProvider.
//                state('home',{
//                    url:'/',
//                    templateUrl:'home/home.html',
//                    controller:'HomeCtrl'
//                })
//                .state('about', {
//                    url:'/about',
//                    templateUrl: 'about/about.html',
//                    controller: 'AboutCtrl'
//                });
//            $urlRouterProvider.otherwise('/');
//        });
    // 解决Facebook身份验证后跳转的Bug。
    // 在OAuth来回的调用中，会在URL的#后面增加字符
    //if (window.location.hash === '#_=_') window.location.hash = '#!';
    //
    //angular.element(document).ready(function () {
    //    angular.bootstrap(document, ['money']);
    //});
//})();