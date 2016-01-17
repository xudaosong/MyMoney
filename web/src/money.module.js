(function () {
    'use strict';

    angular
        .module('money', [
            'ngAnimate',
            'ngMessages',
            'ui.router',
            'fish',
            'money.views',
            'money.constant',
            'money.login',
            'money.header',
            'money.dialog',
            'money.sidebar',
            'money.common',
            'money.signup',
            'money.home',
            'money.voiceBroadcast',
            'money.checklist',
            'money.article'
        ]);
})();