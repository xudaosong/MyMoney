(function() {
    'use strict';
    angular
        .module('money.signup')
        .controller('SignupController', SignupController);
    SignupController.$inject = ['$scope', 'Restangular', '$state'];
    /* @ngInject */
    function SignupController($scope, Restangular, $state) {
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
            if (vm.signupForm.$invalid) {
                return;
            }
            signup.post(vm.data).then(function() {
                $state.go('login');
            }, function(res) {
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
    }
})();
