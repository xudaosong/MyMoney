(function() {
	'use strict';
	angular
		.module('money.article', ['restangular', 'fish', 'money.dialog'])
		.config(function($provide) {
			$provide.decorator('taOptions', function(taRegisterTool, $delegate, taSelection) {
				taRegisterTool('important', {
					iconclass: "fa fa-bell",
					action: function() {
						if (angular.element(taSelection.getSelectionElement()).hasClass('important')) {
							angular.element(taSelection.getSelectionElement()).find("span.rangySelectionBoundary").unwrap();
						} else {
							var selectedText = window.getSelection();
							this.$editor().wrapSelection('inserthtml', '<span class="important">' + selectedText + '</span>', true);
						}
					},
					activeState: function() {
						return angular.element(taSelection.getSelectionElement()).hasClass('important');
					}
				});
				// add the button to the default toolbar definition
				$delegate.toolbar[1].push('important');
				return $delegate;
			});
		});
})();