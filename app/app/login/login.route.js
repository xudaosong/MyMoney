(function () {
  'use strict';
  angular
    .module('money.login')
    .run(webRun);
  webRun.$inject = ['routerHelper'];
  /* @ngInject */
  function webRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'login',
      config: {
        url: '/login',
        templateUrl: 'login/login.view.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      }
    }];
  }
})();
