(function() {
    'use strict';
    angular
        .module('money.checklist')
        .run(webRun);
    webRun.$inject = ['routerHelper'];
    /* @ngInject */
    function webRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'checklist',
            config: {
                url: '/checklist',
                templateUrl: 'checklist/checklist-list.view.html',
                controller: 'ChecklistController',
                controllerAs: 'vm',
                fsBreadcrumb: {
                    label: 'Checklist'
                }
            }
        }];
    }
})();