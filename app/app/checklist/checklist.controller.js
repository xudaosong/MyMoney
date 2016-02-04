(function() {
    'use strict';
    angular
        .module('money.checklist')
        .controller('ChecklistController', ChecklistController);

    ChecklistController.$inject = ['$scope', 'Restangular'];

    /* @ngInject */
    function ChecklistController($scope, Restangular) {
        /* jshint validthis: true */
        var vm = this,
            modal = null,
            checklist = Restangular.all('checklist');
        vm.list = checklist.getList().$object;
        vm.showDialog = function() {
            // Android.showToast('Hello World'); //提示信息
            // Android.openCamera(); //打开相机
            // Android.openPhotoAlbum(); //打开相册
        }
    }

})();
