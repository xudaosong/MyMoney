(function () {
    'use strict';
    angular
        .module('money')
        .config(function (RestangularProvider) {
            RestangularProvider.setBaseUrl('/api');
            RestangularProvider.setRestangularFields({
                id: "_id"
            });
            RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                var extractedData;
                if (operation === "getList") {
                    extractedData = data.data;
                    extractedData.total = data.total;
                } else {
                    extractedData = data.data;
                }
                return extractedData;
            });
        })
        .controller('VoiceBroadcastController', VoiceBroadcastController);

    VoiceBroadcastController.$inject = ['$scope', '$state', 'Restangular', 'uiGridConstants', '$modal'];

    /* @ngInject */
    function VoiceBroadcastController($scope, $state, Restangular, uiGridConstants, $modal) {
        /* jshint validthis: true */
        var vm = this, voiceBroadcast = Restangular.all('voiceBroadcast');
        var paginationOptions = {
            limit: 5,
            page: 1,
            tty:1,
            sort: null,
            content: null
        };
        vm.gridOptions = {
            columnDefs: [
                {field: 'content', displayName: '内容'},
                {field: 'videoUrl', displayName: '视频地址'},
                {field: 'created', type: 'date', displayName: '创建时间', cellFilter: 'date:"yyyy-MM-dd"'}
            ],
            enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
            enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
            paginationPageSizes: [3, 5, 10],
            paginationPageSize: 5,
            useExternalPagination: true,
            useExternalSorting: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        paginationOptions.sort = null;
                    } else {
                        var sort = '', column = sortColumns[0];
                        if (column.sort.direction === "desc")
                            sort = '-';
                        paginationOptions.sort = sort + column.field;
                    }
                    getList();
                });
                $scope.gridApi.pagination.on.paginationChanged($scope, function (currentPage, pageSize) {
                    paginationOptions.limit = pageSize;
                    paginationOptions.page = currentPage;
                    getList();
                });
            }
            //paginationPageSizes: [5, 10, 25],
            //paginationPageSize:5,

        };
        vm.currentPage = 1;
        vm.data = {};
        vm.search = '';
        vm.getList = getList;
        vm.create = create;
        vm.remove = remove;
        vm.update = update;
        vm.showDialog = showDialog;
        ////////////////
        function getList(search) {
            //voiceBroadcast.get({
            //    limit: 10,
            //    page: vm.currentPage
            //}).$promise.then(function (res) {
            //    vm.list = res;
            //});
            paginationOptions.page = vm.currentPage;
            if (search !== undefined)
                paginationOptions.content = search;
            voiceBroadcast.getList(paginationOptions).then(function (res) {
                //vm.gridOptions.totalItems = res.total;
                //vm.gridOptions.data = res;
                vm.list = res;
            });
            Restangular.one('voiceBroadcast','5628b095990920604fbec318').get().then(function () {

            });
        }

        function create() {
            voiceBroadcast.post(vm.data).then(function () {
                $state.go('voiceBroadcast');
            }, function (response) {
                vm.message = response.data.message;
            });
        }

        function update(item) {
            item.content += "update--";
            item.put(item).then(function () {
                //getList();
            });
        }

        function remove(item) {
            item.remove().then(function () {
                getList();
            });
            //item.$remove(function (response) {
            //    getList();
            //}, function (response) {
            //    vm.message = response.data.message;
            //});
        }

        function showDialog() {
            var modal = $modal({
                controller: VoiceBroadcastController,
                controllerAs:'vm',
                templateUrl: 'create-voice-broadcast.tpl.html',
                show: false,
                animation: 'fs-rotate'
            });
            modal.$promise.then(modal.show);
        }
    }
})();