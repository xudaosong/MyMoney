(function () {
    'use strict';
    angular
        .module('money.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'Restangular','$state'];

    /* @ngInject */
    function LoginController($scope, Restangular, $state) {
        /* jshint validthis: true */
        var vm = this,
            login = Restangular.all('login');
        vm.doLogin = doLogin;
       ////////////////////////////
       
       function doLogin (user){ 
           login.post(user).then(function(){
               $state.go('tabs.checklist')
           },function(res){
               alert(res.msg);
           });
       }


    }

})();
