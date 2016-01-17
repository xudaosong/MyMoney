(function() {
    'use strict';
    angular
        .module('money.article')
        .controller('ArticleDetailController', ArticleDetailController);

    ArticleDetailController.$inject = ['$scope', 'Restangular', '$state', '$stateParams', 'ENV'];

    /* @ngInject */
    function ArticleDetailController($scope, Restangular, $state, $stateParams, ENV) {
        /* jshint validthis: true */
        var vm = this,
            article = Restangular.all('article');
        vm.activate = activate;

        ////////////////
        function activate() {
            article.get($stateParams.id).then(function(res) {
                res.content = res.content.replace(/\/upload\//g, ENV.apiEndpoint + '/upload/');
                vm.data = res;
            });
        }
    }
})();
