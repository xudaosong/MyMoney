(function() {
    'use strict';
    angular
        .module('money.checklist')
        .controller('ChecklistController', ChecklistController);

    ChecklistController.$inject = ['$scope', 'Restangular', '$modal', 'dialog', "$interpolate", 'FsTableParams'];

    /* @ngInject */
    function ChecklistController($scope, Restangular, $modal, dialog, $interpolate, FsTableParams) {
        /* jshint validthis: true */
        var vm = this,
            modal = null,
            checklist = Restangular.all('checklist');

        vm.cols = [{
            field: 'title',
            title: '标题',
            groupable: 'title',
            cellClass: 'text-left'
        }, {
            field: 'group',
            title: '分组',
            show: false,
            groupable: 'group'
        }, {
            field: 'author',
            title: '作者',
            groupable: 'author'
        }, {
            field: 'operation',
            title: '操作',
            buttons: [{
                text: '删除',
                css: 'btn-danger',
                icon: 'fa-trash-o',
                onClick: remove
            }, {
                text: '修改',
                icon: 'fa-pencil-square-o',
                onClick: showDialog
            }]
        }];
        vm.tableParams = new FsTableParams({
            group: 'group'
        }, {
            getData: getList,
            counts: []
        });

        vm.authors = ["王宁", "王晓"];
        vm.options = {
            startDate: null,
            endDate: null,
            sort: null,
            keywords: null
        };
        vm.categories = ["股票技术"];
        vm.authors = ["王宁", "王晓"];
        // vm.tableConvert = new FsTableConvert(config);
        // vm.getList = getList;
        // vm.remove = remove;
        vm.removeChecked = removeChecked;
        // vm.showDialog = showDialog;

        ////////////////

        function getList(tableParams) {
            return checklist.getList(vm.options).then(function(res) {
                // tableParams.total(res.total);
                return res;
            });
        }


        function remove(item) {
            dialog.confirm('确定删除该文章？', function() {
                item.remove().then(function(res) {
                    dialog.alert('文章删除成功');
                    vm.tableConvert.reload();
                });
            });
        }

        function removeChecked() {
            var ids = [];
            angular.forEach(vm.list, function(item) {
                if (item.checked) {
                    ids.push(item._id);
                }
            });
            if (ids.length <= 0) {
                dialog.alert('请选择要删除的数据');
            } else {
                dialog.confirm('确定要删除选中的数据？', function() {
                    console.log(ids);
                    checklist.several(ids).remove().then(function() {
                        getList();
                        dialog.alert('删除成功');
                    }, function() {
                        dialog.error('删除失败');
                    });
                });
            }
        }

        function showDialog(data) {
            vm.submitted = false;
            var title = 'Checklist创建';
            if (!!data) {
                title = 'Checklist编辑';
                vm.data = Restangular.copy(data);
            } else {
                vm.data = {};
            }
            modal = $modal({
                title: title,
                scope: $scope,
                controller: 'ChecklistCreateController',
                controllerAs: 'vm',
                templateUrl: 'checklist/checklist-create.view.html',
                show: true,
                animation: 'fs-rotate'
            });
        }

        function save() {
            // if (vm.form.$invalid)
            //     return;
            var promise;
            if (!!vm.data._id) {
                promise = vm.data.put();
            } else {
                promise = checklist.post(vm.data);
            }
            promise.then(function() {
                $scope.$hide();
            }, function(response) {
                if (response.status === 404) {
                    vm.message = '网络错误，请稍候再试！';
                } else if (!!response.data) {
                    vm.message = response.data.msg;
                } else {
                    vm.message = '未知异常！';
                }
            });
        }
    }
})();
