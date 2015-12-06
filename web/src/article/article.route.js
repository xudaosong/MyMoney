(function() {
    'use strict';
    angular
        .module('money.article')
        .run(webRun);
    webRun.$inject = ['routerHelper'];
    /* @ngInject */
    function webRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'article',
            config: {
                url: '/article',
                templateUrl: 'article/article-list.view.html',
                controller: 'ArticleController',
                controllerAs: 'vm',
                fsBreadcrumb: {
                    label: '文章'
                }
            }
        }, {
            state: 'article.create',
            config: {
                url: '/create',
                views: {
                    '@': {
                        templateUrl: 'article/article-create.view.html',
                        controller: 'ArticleCreateController',
                        controllerAs: 'vm'
                    }
                },
                fsBreadcrumb: {
                    label: '新增文章'
                }
            }
        }, {
            state: 'article.detail',
            config: {
                url: '/{id}',
                views: {
                    '@': {
                        templateUrl: 'article/article-detail.view.html',
                        controller: 'ArticleDetailController',
                        controllerAs: 'vm'
                    }
                },
                fsBreadcrumb: {
                    label: '查看文章'
                }
            }
        }, {
            state: 'article.edit',
            config: {
                url: '/edit/{id}',
                views: {
                    '@': {
                        templateUrl: 'article/article-create.view.html',
                        controller: 'ArticleCreateController',
                        controllerAs: 'vm'
                    }
                },
                fsBreadcrumb: {
                    label: '编辑文章'
                }
            }
        }];
    }
})();