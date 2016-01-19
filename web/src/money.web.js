
(function () {
  'use strict';
  angular
    .module('money')
    .run(run);

  run.$inject = ['routerHelper'];

  function run(routerHelper) {
    routerHelper.configureStates([], '/');
    // 解决Facebook身份验证后跳转的Bug。
    // 在OAuth来回的调用中，会在URL的#后面增加字符
    // if (window.location.hash === '#_=_') window.location.hash = '#!';
    
    // angular.element(document).ready(function () {
    //    angular.bootstrap(document, ['money']);
    // });
  }
})();