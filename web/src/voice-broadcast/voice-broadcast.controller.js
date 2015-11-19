(function() {
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
            voiceBroadcast = Restangular.all('voiceBroadcast');
        vm.options = {
            limit: 20,
            page: 1,
            startDate: null,
            endDate: null,
            isEssential: null,
            sort: null,
            keywords: null
        };
        vm.htmlContent = '';
        vm.submitted = false;
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
        activate();
        ////////////////
        function activate() {
            $scope.$watch('vm.htmlContent', function(newValue) {
                if (!!newValue) autoParse();
            });
        }

        function getList() {
            if (vm.options.isEssential === '') vm.options.isEssential = null;
            voiceBroadcast.getList(vm.options).then(function(res) {
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
            promise.then(function() {
                modal.hide();
                getList();
            }, function(response) {
                if (response.status === 404) {
                    vm.message = '网络错误，请稍候再试！';
                } else {
                    vm.message = response.data.message;
                }
            });
        }

        function remove(item) {
            dialog.confirm('确定删除该文章？', function() {
                item.remove().then(function(res) {
                    dialog.alert('文章删除成功');
                    getList();
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
                    voiceBroadcast.several(ids).remove().then(function() {
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
            angular.forEach(vm.list, function(item) {
                item.checked = checked;
            });
        };

        function autoParse() {
            var data = parse(1);
            var data2 = parse(2);
            vm.parseData = data.length > data2.length ? data : data2;
            return vm.parseData;
        }

        function parse(type) {
            var data = [],
                item, rows;
            var article = angular.element('<div>' + vm.htmlContent + '</div>');
            // var rows = article.find('div.lylist>dl>dd>');
            // if(type===2 || rows.length < 15){
            //     rows = article.find('div.lylist .MsoNormal');
            // }

            switch (type) {
                case 1:
                    rows = article.find('div.lylist>dl>dd>');
                    break;
                case 2:
                    rows = article.find('div.lylist .MsoNormal');
                    break;
            }
            var year = article.find("div.name").text();
            year = year.substr(year.indexOf('发表于') + 3, 5);
            angular.forEach(rows, function(row) {
                var text = angular.element(row).text().replace('·', '').replace('·', '').trim();
                if (text === '') return false;
                text = year + text;
                if (!!Date.parse(text)) {
                    item && data.push(item);
                    item = {
                        content: '',
                        isEssential: false
                    };
                    item.created = new Date(text);
                } else {
                    if (!item) return false;
                    if (angular.element(row).hasClass('sign')) return false;
                    item.content += angular.element(row).html().split('<br>').map(function(content) {
                        var text = angular.element('<div>' + content + '</div>').text();
                        if (!!Date.parse(year+text.trim())) {
                            item && data.push(item);
                            item = {
                                content: '',
                                isEssential: false
                            };
                            item.created = new Date(year+text.trim());
                            return;
                        }
                        return '<p>' + angular.element('<div>' + content + '</div>').text() + '</p>';
                    }).join('');
                }
            });
            item && data.push(item);
            vm.parseData = data;
            return data;
        }

        function batchSave(isReturn) {
            return voiceBroadcast.post(vm.parseData).then(function(res) {
                if (isReturn) {
                    $state.go('voiceBroadcast');
                } else {
                    vm.parseData = [];
                    vm.htmlContent = '';
                }
            }, function(res) {
                dialog.error(res.statusText);
            });
        }
    }
})();