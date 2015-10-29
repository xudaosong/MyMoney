(function () {
    'use strict';

    angular
        .module('money', [
            'ngAnimate',
            'ngMessages',
            'ui.router',
            'fish',
            'money.views',
            'money.header',
            'money.dialog',
            'money.sidebar',
            'money.common',
            'money.breadcrumbs',
            'money.signup',
            'money.voiceBroadcast'
        ]);
})();