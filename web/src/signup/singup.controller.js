(function () {
    'use strict';
    angular
        .module('money.signup')
        .controller('SignupController', SignupController);
    SignupController.$inject = ['$scope', 'signup'];
    /* @ngInject */
    function SignupController($scope, signup) {
        var vm = this;
        vm.data = {
            username: 'xudaosong',
            password: 'xudaosong',
            email: 'xudaosong@163.com'
        };
        vm.activate = activate;
        vm.signupSubmit = signupSubmit;
        vm.interacted = interacted;
        vm.isSuccess = isSuccess;
        vm.isError = isError;
        vm.message = '';
        activate();

        ////////////////
        function activate() {
            console.log('signup');
        }

        function signupSubmit() {
            console.log(vm.data);
            vm.submitted = true;
            signup.create(vm.data).then(function (data) {
                vm.message = data.data.message;
                console.log('success', data);
            },function (data) {
                vm.message = data.data.message;
                console.log('fail', data);
            });
            return false;
        }

        function interacted(field) {
            return vm.submitted || field.$dirty;
        }

        function isSuccess(field) {
            return interacted(field) && field.$valid;
        }

        function isError(field) {
            return interacted(field) && field.$invalid;
        }
    };
})();