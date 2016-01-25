(function() {
    'use strict';
    angular
        .module('money.common')
        .config(config);

    config.$inject = ['$provide'];

    function config($provide) {
        $provide.decorator('taOptions', textAngularExtend);

    }

    textAngularExtend.$inject = ['taRegisterTool', '$delegate', '$modal', 'taToolFunctions', 'taSelection', 'ENV', 'authentication'];

    function textAngularExtend(taRegisterTool, $delegate, $modal, taToolFunctions, taSelection, ENV, authentication) {
        taRegisterTool('fsInsertImage', {
            iconclass: "fa fa-picture-o",
            tooltiptext: '插入图片',
            action: function($deferred) {
                var textAngular = this;
                var savedSelection = rangy.saveSelection();
                var modalInstance = $modal({
                    templateUrl: 'common/insertImage.tpl.html',
                    show: true,
                    title: '插入图片',
                    animation: 'fs-zoom',
                    controller: /** @ngInject */ function($scope, Upload, $timeout) {
                        $scope.data = {
                            imageForm: undefined,
                            imageUrl: 'http://',
                            imageFiles: []
                        };
                        $scope.uploadFiles = function(files) {
                            $scope.data.imageFiles = files;
                            angular.forEach(files, function(file) {
                                if (!file.$error) {
                                    file.upload = Upload.upload({
                                        headers: {
                                            'Authorization': 'Bearer ' + authentication.user.token
                                        },
                                        url: ENV.apiEndpoint + '/api/upload',
                                        file: file
                                    });
                                    file.upload.then(function(response) {
                                        $timeout(function() {
                                            file.result = response.data.file;
                                        });
                                    }, function(response) {
                                        if (response.status > 0)
                                            $scope.errorMsg = response.status + ': ' + response.data;
                                    });
                                    file.upload.progress(function(evt) {
                                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                                    });
                                }
                            });
                        };
                        $scope.submit = function() {
                            if ($scope.data.imageForm.$valid) {
                                rangy.restoreSelection(savedSelection);
                                textAngular.$editor().wrapSelection('insertImage', $scope.data.imageUrl);
                            }
                            angular.forEach($scope.data.imageFiles, function(file) {
                                rangy.restoreSelection(savedSelection);
                                textAngular.$editor().wrapSelection('insertImage', file.result.src);
                            });

                            $deferred.resolve();
                            modalInstance.hide();
                        };
                    }
                });
                return false;
            },
            onElementSelect: {
                element: 'img',
                action: taToolFunctions.imgOnSelectAction
            }
        });
        // add the button to the default toolbar definition
        $delegate.toolbar[3].push('fsInsertImage');


        taRegisterTool('important', {
            iconclass: "fa fa-bell",
            action: function() {
                var selectionElement = taSelection.getSelectionElement();
                if (angular.element(selectionElement).hasClass('important')) {
                    if (selectionElement.tagName === 'SPAN') {
                        angular.element(selectionElement).find("span.rangySelectionBoundary").unwrap();
                    } else {
                        angular.element(selectionElement).removeClass('important');
                    }
                } else {
                    var elements = taSelection.getOnlySelectedElements();
                    if (elements.length > 0) {
                        angular.forEach(elements, function(item) {
                            var ele = angular.element(item);
                            ele.addClass('important');
                        });
                    } else {
                        var selectedText = window.getSelection();
                        this.$editor().wrapSelection('inserthtml', '<span class="important">' + selectedText + '</span>', true);
                    }
                }
            },
            activeState: function() {
                return angular.element(taSelection.getSelectionElement()).hasClass('important');
            }
        });
        // add the button to the default toolbar definition
        $delegate.toolbar[1].push('important');
        return $delegate;
    }
})();
