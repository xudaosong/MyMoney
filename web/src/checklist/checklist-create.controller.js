(function() {
    'use strict';
    angular
        .module('money.checklist')
        .controller('ChecklistCreateController', ChecklistCreateController);

    ChecklistCreateController.$inject = ['$scope', 'Restangular', '$modal'];

    /* @ngInject */
    function ChecklistCreateController($scope, Restangular, $modal) {
        /* jshint validthis: true */
        var vm = this,
            checklist = Restangular.all('checklist');

        vm.fields = [{
            type: 'textarea',
            key: 'title',
            templateOptions: {
                required: true,
                rows: 3,
                label: '标题',
                placeholder: '标题'
            },
            validation: {
                messages: {
                    required: '"请输入" + to.label'
                }
            }
        }, {
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
        }, {
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
        }];

        vm.save = save;
        /////////////////////////

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
                $scope.$hide();
                $scope.$parent.vm.tableConvert.reload();
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