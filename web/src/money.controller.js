(function() {
    'use strict';

    angular
        .module('money')
        .controller('MoneyController', MoneyController);

    MoneyController.$inject = ['$state'];

    /* @ngInject */
    function MoneyController($state) {
        var vm = this;
        vm.hasWrap = hasWrap;

        ////////////////

        function hasWrap() {
        	if($state.is('login') || $state.is('signup')){
        		return false;
        	}
        	return true;
        }
    }
})();