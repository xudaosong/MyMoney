(function() {
    'use strict';
    angular
        .module('money.checklist')
        .controller('ChecklistController', ChecklistController);

    ChecklistController.$inject = ['$scope', 'Restangular'];

    /* @ngInject */
    function ChecklistController($scope, Restangular) {
        /* jshint validthis: true */
        var vm = this,
            modal = null,
            checklist = Restangular.all('checklist');

    }

})();
