(function() {
    'use strict';
    angular
        .module('money')
        .run(run);

    run.$inject = ['$ionicPlatform', 'routerHelper'];

    function run($ionicPlatform, routerHelper) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                window.cordova.plugins.Keyboard.disableScroll(true);

                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    window.StatusBar.styleDefault();
                }
            }
        });

        routerHelper.configureStates([], '/');

    }
})();
