(function() {
    'use strict';
    angular
        .module('money.checklist')
        .controller('ChecklistCreateController', ChecklistCreateController);

    ChecklistCreateController.$inject = ['$scope', 'Restangular', '$modal', '$state', '$stateParams'];

    /* @ngInject */
    function ChecklistCreateController($scope, Restangular, $modal, $state, $stateParams) {
        /* jshint validthis: true */
        var vm = this,
            checklist = Restangular.all('checklist');
       
    }
})();