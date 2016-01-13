(function () {
    'use strict';
    angular
        .module('money.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'Restangular','$state','$window'];

    /* @ngInject */
    function LoginController($scope, Restangular, $state,$window) {
        /* jshint validthis: true */
        var vm = this,
            login = Restangular.all('login');
        vm.doLogin = doLogin;
       ////////////////////////////
       
       function doLogin (user){ 
           login.post(user).then(function(res){
              $window.sessionStorage.token = res.token;
              Restangular.setDefaultHeaders({Authorization: "Bearer "+ res.token});
              $state.go('tabs.checklist');
           },function(res){
               alert(res.msg);
           });
       }


    }

})();
