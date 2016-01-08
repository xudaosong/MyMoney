(function() {
    'use strict';
    angular
        .module('money.checklist')
        .controller('ChecklistDetailController', ChecklistDetailController);

    ChecklistDetailController.$inject = ['$scope', 'Restangular', '$state', '$stateParams'];

    /* @ngInject */
    function ChecklistDetailController($scope, Restangular, $state, $stateParams) {
        /* jshint validthis: true */
        var vm = this,
            checklist = Restangular.all('checklist');
        vm.activate = activate;

        ////////////////
        function activate() {
            checklist.get($stateParams.id).then(function(res) {
                vm.data = res;
            });
        }
    }
})();