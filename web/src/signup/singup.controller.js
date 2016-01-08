(function () {
    'use strict';
    angular
        .module('money.signup')
        .controller('SignupController', SignupController);
    SignupController.$inject = ['$scope', 'Restangular'];
    /* @ngInject */
    function SignupController($scope, Restangular) {
        var vm = this,
            signup = Restangular.all('signup');
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
            signup.post(vm.data).then(function () {
                window.location.href = "/login";
            }, function (res) {
                vm.message = res.data.message;
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