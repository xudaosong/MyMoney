(function () {
    'use strict';

    angular
        .module('money', [
            'ngAnimate',
            'ui.router',
            'fish',
            'money.views',
            'money.header',
            'money.sidebar',
            'money.common',
            'money.signup',
            'money.voiceBroadcast'
        ]);
})();