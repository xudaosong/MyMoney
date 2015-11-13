(function () {
    'use strict';
    angular
        .module('money.signup')
        .controller('SignupController', SignupController);
    SignupController.$inject = ['$scope', 'signup'];
    /* @ngInject */
    function SignupController($scope, signup) {
        var vm = this;
        vm.data = {};
        vm.signupSubmit = signupSubmit;
        vm.interacted = interacted;
        vm.isSuccess = isSuccess;
        vm.isError = isError;
        vm.message = '';

        ////////////////

        function signupSubmit() {
            vm.submitted = true;
            if (vm.signup_form.$invalid)
                return;
            signup.create(vm.data).then(function () {
                window.location.href = "/signin";
            }, function (data) {
                vm.message = data.data.message;
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