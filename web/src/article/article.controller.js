(function() {
    'use strict';
    angular
        .module('money.article')
        .controller('ArticleController', ArticleController);

    ArticleController.$inject = ['$scope', 'Restangular', 'dialog'];

    /* @ngInject */
    function ArticleController($scope, Restangular, dialog) {
        /* jshint validthis: true */
        var vm = this,
            article = Restangular.all('article');
        vm.options = {
            limit: 20,
            page: 1,
            startDate: null,
            endDate: null,
            isGood: null,
            sort: null,
            keywords: null
        };
        vm.authors = ['王宁', '王晓', '羿飞'];
        vm.sources = ['和讯直播室', '微信公众号', '网易博客'];
        vm.getList = getList;
        vm.remove = remove;
        vm.removeChecked = removeChecked;
        vm.toggleChecked = toggleChecked;
        ////////////////

        function getList() {
            if (vm.options.isEssential === '') {vm.options.isEssential = null;}
            article.getList(vm.options).then(function(res) {
                vm.list = res;
            });
        }

        // function save(isReturn) {
        //     vm.submitted = true;
        //     if (vm.my_form.$invalid)
        //         return;
        //     var promise;
        //     if (!!vm.data._id) {
        //         promise = vm.data.put();
        //     } else {
        //         promise = article.post(vm.data);
        //     }
        //     return promise.then(function() {
        //         if (isReturn) {
        //             $state.go('article');
        //         } else {
        //             vm.data = {};
        //         }
        //     }, function(response) {
        //         if (response.status === 404) {
        //             vm.message = '网络错误，请稍候再试！';
        //         } else {
        //             vm.message = response.data.message;
        //         }
        //     });
        // }

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
                dialog.alert('请选择要删除的文章');
            } else {
                dialog.confirm('确定要删除选中的文章？', function() {
                    console.log(ids);
                    article.several(ids).remove().then(function() {
                        getList();
                        dialog.alert('删除成功');
                    }, function() {
                        dialog.error('删除失败');
                    });
                });
            }
        }

        function toggleChecked(checked) {
            angular.forEach(vm.list, function(item) {
                item.checked = checked;
            });
        }
    }
})();