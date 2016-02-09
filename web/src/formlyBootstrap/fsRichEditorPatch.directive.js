(function () {
    'use strict';

    angular
        .module('fish.formlyBootstrap')
        .directive('fsRichEditorPatch', fsRichEditorPatch);

    fsRichEditorPatch.$inject = ['textAngularManager'];
    
    function fsRichEditorPatch(textAngularManager) {
        var directive = {
            link: link,
            transclude:false,
            restrict: 'A',
            priority: 1
        };
        return directive;

        function link(scope, element, attrs) {
                textAngularManager.unregisterEditor(attrs['name']);
        }
    }
})();