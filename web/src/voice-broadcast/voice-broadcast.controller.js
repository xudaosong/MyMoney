(function () {
    'use strict';
    angular
        .module('money')
        .controller('VoiceBroadcastController', VoiceBroadcastController);

    VoiceBroadcastController.$inject = ['$scope', 'Restangular', '$modal', 'dialog', '$templateCache', '$state'];

    /* @ngInject */
    function VoiceBroadcastController($scope, Restangular, $modal, dialog, $templateCache, $state) {
        /* jshint validthis: true */
        var vm = this,
            modal = null,
            voiceBroadcast = Restangular.all('voiceBroadcast'),
            paginationOptions = {
                limit: 100,
                page: 1,
                sort: null,
                content: null
            };
        vm.htmlContent = $templateCache.get('voice-broadcast/article.view.html');
        vm.submitted = false;
        vm.currentPage = 1;
        vm.data = {};
        vm.search = '';
        vm.getList = getList;
        vm.save = save;
        vm.remove = remove;
        vm.removeChecked = removeChecked;
        vm.showDialog = showDialog;
        vm.check = check;
        vm.interacted = interacted;
        vm.parse = parse;
        vm.batchSave = batchSave;
        vm.toggleChecked = toggleChecked;
        ////////////////
        function getList(search) {
            paginationOptions.page = vm.currentPage;
            if (search !== undefined)
                paginationOptions.content = search;
            voiceBroadcast.getList(paginationOptions).then(function (res) {
                vm.list = res;
            });
        }

        function save() {
            vm.submitted = true;
            if (vm.my_form.$invalid)
                return;
            var promise;
            if (!!vm.data._id) {
                promise = vm.data.put();
            } else {
                promise = voiceBroadcast.post(vm.data);
            }
            promise.then(function () {
                modal.hide();
                getList();
            }, function (response) {
                if (response.status === 404) {
                    vm.message = '网络错误，请稍候再试！';
                } else {
                    vm.message = response.data.message;
                }
            });
        }

        function remove(item) {
            dialog.confirm('确定删除该文章？', function () {
                item.remove().then(function (res) {
                    dialog.alert('文章删除成功');
                    getList();
                });
            });
        }

        function removeChecked() {
            var ids = [];
            angular.forEach(vm.list, function (item) {
                if (item.checked) {
                    ids.push(item._id);
                }
            });
            if (ids.length <= 0) {
                dialog.alert('请选择要删除的数据');
            } else {
                dialog.confirm('确定要删除选中的数据？', function () {
                    console.log(ids);
                    voiceBroadcast.several(ids).remove().then(function () {
                        getList();
                        dialog.alert('删除成功');
                    }, function () {
                        dialog.error('删除失败');
                    });
                });
            }
        }

        function showDialog(data) {
            vm.submitted = false;
            var title = '文章创建';
            if (!!data) {
                title = '文章编辑';
                vm.data = Restangular.copy(data);
            } else {
                vm.data = {};
            }
            modal = $modal({
                title: title,
                scope: $scope,
                //controller: VoiceBroadcastDialogController,
                //controllerAs: 'vm',
                templateUrl: 'create-voice-broadcast.tpl.html',
                show: true,
                animation: 'fs-rotate'
            });
        }

        function interacted(field) {
            if (!field)
                return false;
            return vm.submitted || field.$dirty;
        }

        function check(field, isCorrect) {
            var checkResult = false;
            if (interacted(field)) {
                if (isCorrect) {
                    checkResult = field.$valid;
                } else {
                    checkResult = field.$invalid;
                }

            }
            return checkResult;
        }

        function toggleChecked(checked) {
            angular.forEach(vm.list, function (item) {
                item.checked = checked;
            });
        };
        function parse() {
            var data = [], item;
            var article = angular.element('<div>' + vm.htmlContent + '</div>');
            var rows = article.find('p.MsoNormal');
            var year = article.find("div.name").text();
            year = year.substr(year.indexOf('发表于') + 3, 5);
            angular.forEach(rows, function (row) {
                var text = year + angular.element(row).text().replace('·', '').trim();
                if (!!Date.parse(text)) {
                    item && data.push(item);
                    item = {
                        content: '',
                        isEssential: false
                    };
                    item.created = new Date(year + (angular.element(row).text().replace('·', '').trim()));
                } else {
                    item.content += angular.element(row).html().split('<br>').map(function (content) {
                        return '<p>' + angular.element('<div>' + content + '</div>').text() + '</p>';
                    }).join('');
                }
            });
            vm.parseData = data;
            return data;
        }

        function batchSave(isReturn) {
            return voiceBroadcast.post(vm.parseData).then(function (res) {
                if (isReturn) {
                    $state.go('voiceBroadcast');
                } else {
                    vm.parseData = [];
                    vm.htmlContent = '';
                }
            }, function (res) {
                dialog.error(res.statusText);
            });
        }
    }
})();