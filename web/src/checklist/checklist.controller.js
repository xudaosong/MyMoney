(function() {
    'use strict';
    angular
        .module('money.checklist')
        .controller('ChecklistController', ChecklistController);

    ChecklistController.$inject = ['$scope', 'Restangular', '$modal', 'dialog', "$interpolate", 'FsTableParams','$sce'];

    /* @ngInject */
    function ChecklistController($scope, Restangular, $modal, dialog, $interpolate, FsTableParams,$sce) {
        /* jshint validthis: true */
        var vm = this,
            modal = null,
            checklist = Restangular.all('checklist');
        vm.fields = [{
            className:'row',
            fieldGroup:[{
                className:'col-xs-6',
                type: 'select',
                key: 'group',
                defaultValue: '买入',
                templateOptions: {
                    label: '分组',
                    options: [{
                        name: '买入',
                        value: '买入'
                    }, {
                        name: '卖出',
                        value: '卖出'
                    }, {
                        name: '选股',
                        value: '选股'
                    }]
                }
            },{
                className:'col-xs-6',
                type: 'select',
                key: 'author',
                defaultValue: '许道松',
                templateOptions: {
                    label: '作者',
                    options: [{
                        name: '许道松',
                        value: '许道松'
                    }, {
                        name: '王宁',
                        value: '王宁'
                    }, {
                        name: '王晓',
                        value: '王晓'
                    }]
                }
            }]
        }, {
            type: 'textarea',
            key: 'title',
            templateOptions: {
                required: true,
                rows: 2,
                label: '标题',
                placeholder: '标题'
            },
            validation: {
                messages: {
                    required: '"请输入" + to.label'
                }
            }
        }, {
            type: 'richEditor',
            key: 'content',
            templateOptions: {
                label: '内容'
            }
        }];

        vm.cols = [{
            field: 'title',
            title: '标题',
            groupable: 'title',
            cellClass: 'text-left',
            getValue: interpolatedValue,
            interpolateExpr: $interpolate('<a href="#!/checklist/{{row[\'_id\'] }}">{{row["title"]}}</a>')
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
            author:null,
            keywords: null
        };
        vm.categories = ["股票技术"];
        vm.authors = ["王宁", "王晓"];
        // vm.tableConvert = new FsTableConvert(config);
        // vm.getList = getList;
        vm.remove = remove;
        vm.removeChecked = removeChecked;
        vm.showDialog = showDialog;
        vm.save = save;

        ////////////////

       function interpolatedValue($scope, row) {
          return this.interpolateExpr({
            row: row
          });
        }
        function getList(tableParams) {
            return checklist.getList(vm.options).then(function(res) {
                // tableParams.total(res.total);
                return res;
            });
        }


        function remove(item) {
            dialog.confirm('确定删除该Checklist？', function() {
                item.remove().then(function(res) {
                    dialog.alert('Checklist删除成功');
                    vm.tableParams.reload();
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
                // controller: 'ChecklistCreateController',
                // controllerAs: 'vm',
                templateUrl: 'checklist/checklist-create.view.html',
                show: true,
                animation: 'fs-rotate'
            });
        }

        function save() {
            if (vm.form.$invalid)
                return;
            var promise;
            if (!!vm.data._id) {
                promise = vm.data.put();
            } else {
                promise = checklist.post(vm.data);
            }
            promise.then(function() {
                vm.tableParams.reload();
                modal.hide();
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