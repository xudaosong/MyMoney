(function() {
    'use strict';
    angular
        .module('money')
        .controller('ArticleDetailController', ArticleDetailController);

    ArticleDetailController.$inject = ['$scope', 'Restangular', '$state', '$stateParams'];

    /* @ngInject */
    function ArticleDetailController($scope, Restangular, $state, $stateParams) {
        /* jshint validthis: true */
        var vm = this,
            article = Restangular.all('article');
        vm.activate = activate;

        ////////////////
        function activate() {
            article.get($stateParams.id).then(function(res) {
                vm.data = res;
            });
        }
    }
})();