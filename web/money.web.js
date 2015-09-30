angular.module('mean', ['ngRoute', 'ngResource', 'example', 'users', 'articles', 'chat'])
    .config(function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    });
// 解决Facebook身份验证后跳转的Bug。
// 在OAuth来回的调用中，会在URL的#后面增加字符
if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function () {
    angular.bootstrap(document, ['mean']);
});