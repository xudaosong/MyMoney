(function() {
    'use strict';
    angular
        .module('money.article')
        .controller('ArticleCreateController', ArticleCreateController);

    ArticleCreateController.$inject = ['$scope', 'Restangular', '$modal', '$state', '$stateParams'];

    /* @ngInject */
    function ArticleCreateController($scope, Restangular, $modal, $state, $stateParams) {
        /* jshint validthis: true */
        var vm = this,
            article = Restangular.all('article');
        vm.categories = ['股票技术'];
        vm.authors = ['王宁', '王晓'];
        vm.sources = ['和讯直播室', '微信公众号', '网易博客'];
        vm.origin = '';
        vm.submitted = false;
        vm.data = {};
        vm.save = save;
        vm.check = check;
        vm.interacted = interacted;
        vm.parse = parse;
        activate();
        ////////////////
        function activate() {
            if ($stateParams.id) {
                article.get($stateParams.id).then(function(data) {
                    vm.data = data;
                });
            }
            $scope.$watch('vm.origin', function(newValue) {
                if (!!newValue) {
                    autoParse();
                }
            });
        }

        function save(isReturn) {
            vm.submitted = true;
            if (vm.myForm.$invalid) {
                return;
            }
            var promise;
            if (!!vm.data._id) {
                promise = vm.data.put();
            } else {
                promise = article.post(vm.data);
            }
            return promise.then(function() {
                if (isReturn) {
                    $state.go('article');
                } else {
                    vm.origin = '';
                    vm.data = {
                        category: vm.data.category,
                        author: vm.data.author,
                        source: vm.data.source,
						created: vm.data.created
                    };
                    vm.submitted = false;
                    vm.myForm.$setPristine();
                    vm.myForm.$setUntouched();
                }
            }, function(response) {
                if (response.status === 404) {
                    vm.message = '网络错误，请稍候再试！';
                } else {
                    vm.message = response.data.message;
                }
            });
        }

        function interacted(field) {
            if (!field) {
                return false;
            }
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

        function autoParse() {
            vm.data.content = parse(1);
            // var data2 = parse(2);
            // vm.parseData = data.length > data2.length ? data : data2;
            return vm.content;
        }

        function parse(type) {
            var items = vm.origin.split('\n');
            angular.forEach(items, function(item, i) {
                item = item.trim();
                if (item.length === 0) {
                    return false;
                }
                items[i] = '<p>' + item + '</p>';
            });
            return items.join('');
            // var rows = article.find('div.lylist>dl>dd>');
            // if(type===2 || rows.length < 15){
            //     rows = article.find('div.lylist .MsoNormal');
            // }

            // switch (type) {
            //     case 1:
            //         rows = article.find('.lylist dd').text().split('\n');
            //         break;
            //     case 2:
            //         rows = article.find('div.lylist .MsoNormal');
            //         break;
            //     case 3:
            //         rows = article.find('div.lylist>dl>dd p');
            //         break;
            // }
            // var year = article.find('div.name').text();
            // year = year.substr(year.indexOf('发表于') + 3, 5);
            // angular.forEach(rows, function(row) {
            //     var text = angular.element(row).text().replace('·', '').replace('·', '').trim();
            //     if (text === '') return false;
            //     if (text.indexOf(':') > 0 && text.indexOf('-') > 0 && !!Date.parse(year + text)) {
            //         item && data.push(item);
            //         item = {
            //             content: '',
            //             isEssential: false
            //         };
            //         item.created = new Date(year + text);
            //     } else {
            //         if (!item) return false;
            //         if (angular.element(row).hasClass('sign')) return false;
            //         item.content += angular.element(row).html().split('<br>').map(function(content) {
            //             var text = angular.element('<div>' + content + '</div>').text();
            //             if (text.indexOf(':') > 0 && text.indexOf('-') > 0 && !!Date.parse(year + text.trim())) {
            //                 item && data.push(item);
            //                 item = {
            //                     content: '',
            //                     isEssential: false
            //                 };
            //                 item.created = new Date(year + text.trim());
            //                 return;
            //             }
            //             return '<p>' + angular.element('<div>' + content + '</div>').text() + '</p>';
            //         }).join('');
            //     }
            // });
            // item && data.push(item);
            // vm.parseData = data;
            // return data;
        }
    }
})();
