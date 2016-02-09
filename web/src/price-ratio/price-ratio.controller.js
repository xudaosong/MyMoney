(function() {
    'use strict';
    angular
        .module('money.priceRatio')
        .controller('PriceRatioController', PriceRatioController);

    PriceRatioController.$inject = ['$scope', 'Restangular', '$modal', 'dialog', '$interpolate', 'FsTableParams', '$sce', 'config'];

    /* @ngInject */
    function PriceRatioController($scope, Restangular, $modal, dialog, $interpolate, FsTableParams, $sce, config) {
        /* jshint validthis: true */
        var vm = this,
            priceRatio = Restangular.all('priceRatio'),
            dataset = priceRatio.getList().$object;

        vm.cols = [{
            field: 'code',
            title: '代码',
            sortable: 'code',
            dataType: 'text'
        }, {
            field: 'name',
            title: '名称',
            sortable: 'name',
            dataType: 'text'
        }, {
            field: 'maxPrice',
            title: '最高价',
            sortable: 'maxPrice',
            dataType: 'number'
        }, {
            field: 'secondPrice',
            title: '次高价',
            sortable: 'secondPrice',
            dataType: 'number'
        }, {
            field: 'minPrice',
            title: '最低价',
            sortable: 'minPrice',
            dataType: 'number'
        }, {
            field: 'currentPrice',
            title: '当前价',
            sortable: 'currentPrice',
            dataType: 'number'
        }, {
            field: 'firstDrop',
            title: '到最高价的跌幅',
            sortable: 'firstDrop',
            dataType: 'number'
        }, {
            field: 'firstGains',
            title: '到最高价的涨幅',
            sortable: 'firstGains',
            dataType: 'number'
        }, {
            field: 'secondDrop',
            title: '到次高价的跌幅',
            sortable: 'secondDrop',
            dataType: 'number'
        }, {
            field: 'secondGains',
            title: '到次高价的涨幅',
            sortable: 'secondGains',
            dataType: 'number'
        }];
        vm.tableParams = new FsTableParams({

        }, {
            dataset: dataset
        });

        // vm.tableConvert = new FsTableConvert(config);
        // vm.getList = getList;
        vm.remove = remove;
        vm.save = save;

        ////////////////

        function remove(item) {
            dialog.confirm('确定删除该PriceRatio？', function() {
                item.remove().then(function(res) {
                    dialog.alert('PriceRatio删除成功');
                    vm.tableParams.reload();
                });
            });
        }


        function save() {
            if (vm.form.$invalid) {
                return;
            }
            var promise;
            if (!!vm.data._id) {
                promise = vm.data.put();
            } else {
                promise = priceRatio.post(vm.data);
            }
            promise.then(function() {
                vm.tableParams.reload();
                // modal.hide();
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
