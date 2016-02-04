(function() {
    'use strict';

    angular
        .module('fish.formlyBootstrap').constant('fsFormlyBootstrapApiCheck', apiCheck({
            output: {
                prefix: 'angular-formly-bootstrap'
            }
        }));


    angular
        .module('fish.formlyBootstrap').config(config);

    config.$inject = ['formlyConfigProvider'];

    function config(formlyConfigProvider) {
        formlyConfigProvider.setWrapper([{
            name: 'bootstrapLabel',
            templateUrl: 'formlyBootstrap/label.wrapper.html',
            apiCheck: function(check) {
                return {
                    templateOptions: {
                        label: check.string,
                        required: check.bool.optional,
                        labelSrOnly: check.bool.optional
                    }
                };
            }
        }, {
            name: 'bootstrapValidationStates',
            templateUrl: 'formlyBootstrap/validation-states.wrapper.html'
        }]);

        formlyConfigProvider.setType({
            name: 'input',
            templateUrl: 'formlyBootstrap/input.type.html',
            wrapper: ['bootstrapLabel', 'bootstrapValidationStates']
        });

        formlyConfigProvider.setType({
            name: 'richEditor',
            templateUrl: 'formlyBootstrap/richEditor.type.html',
            wrapper: ['bootstrapLabel', 'bootstrapValidationStates']
        });

        formlyConfigProvider.setType({
            name: 'textarea',
            templateUrl: 'formlyBootstrap/textarea.type.html',
            wrapper: ['bootstrapLabel', 'bootstrapValidationStates'],
            defaultOptions: {
                ngModelAttrs: {
                    rows: {
                        attribute: 'rows'
                    },
                    cols: {
                        attribute: 'cols'
                    }
                }
            },
            apiCheck: function(check) {
                return {
                    templateOptions: {
                        rows: check.number.optional,
                        cols: check.number.optional
                    }
                };
            }
        });
        formlyConfigProvider.setType({
            name: 'radio',
            templateUrl: 'formlyBootstrap/radio.type.html',
            wrapper: ['bootstrapLabel', 'bootstrapValidationStates'],
            defaultOptions: {
                noFormControl: false
            },
            apiCheck: function(check) {
                return {
                    templateOptions: {
                        options: check.arrayOf(check.object),
                        labelProp: check.string.optional,
                        valueProp: check.string.optional
                    }
                };
            }
        });
        formlyConfigProvider.setType({
            name: 'checkbox',
            templateUrl: 'formlyBootstrap/checkbox.type.html',
            wrapper: ['bootstrapValidationStates'],
            apiCheck: function(check) {
                return {
                    templateOptions: {
                        label: check.string
                    }
                };
            }
        });
        formlyConfigProvider.setType({
            name: 'mutliCheckbox',
            templateUrl: 'formlyBootstrap/multiCheckbox.type.html',
            wrapper: ['bootstrapLabel', 'bootstrapValidationStates'],
            apiCheck: function(check) {
                return {
                    templateOptions: {
                        options: check.arrayOf(check.object),
                        labelProp: check.string.optional,
                        valueProp: check.string.optional
                    }
                };
            },
            defaultOptions: {
                noFormControl: false,
                ngModelAttrs: {
                    required: {
                        attribute: '',
                        bound: ''
                    }
                }
            },
            controller: /* @ngInject */ function($scope) {
                var to = $scope.to;
                var opts = $scope.options;
                $scope.multiCheckbox = {
                    checked: [],
                    change: setModel
                };

                // initialize the checkboxes check property
                $scope.$watch('model', function modelWatcher(newModelValue) {
                    var modelValue, valueProp;

                    if (Object.keys(newModelValue).length) {
                        modelValue = newModelValue[opts.key];

                        $scope.$watch('to.options', function optionsWatcher(newOptionsValues) {
                            if (newOptionsValues && Array.isArray(newOptionsValues) && Array.isArray(modelValue)) {
                                valueProp = to.valueProp || 'value';
                                for (var index = 0; index < newOptionsValues.length; index++) {
                                    $scope.multiCheckbox.checked[index] = modelValue.indexOf(newOptionsValues[index][valueProp]) !== -1;
                                }
                            }
                        });
                    }
                }, true);

                function checkValidity(expressionValue) {
                    var valid;

                    if ($scope.to.required) {
                        valid = angular.isArray($scope.model[opts.key]) &&
                            $scope.model[opts.key].length > 0 &&
                            expressionValue;

                        $scope.fc.$setValidity('required', valid);
                    }
                }

                function setModel() {
                    $scope.model[opts.key] = [];
                    angular.forEach($scope.multiCheckbox.checked, function(checkbox, index) {
                        if (checkbox) {
                            $scope.model[opts.key].push(to.options[index][to.valueProp || 'value']);
                        }
                    });

                    // Must make sure we mark as touched because only the last checkbox due to a bug in angular.
                    $scope.fc.$setTouched();
                    checkValidity(true);
                }

                if (opts.expressionProperties && opts.expressionProperties['templateOptions.required']) {
                    $scope.$watch(function() {
                        return $scope.to.required;
                    }, function(newValue) {
                        checkValidity(newValue);
                    });
                }

                if ($scope.to.required) {
                    var unwatchFormControl = $scope.$watch('fc', function(newValue) {
                        if (!newValue) {
                            return;
                        }
                        checkValidity(true);
                        unwatchFormControl();
                    });
                }
            }
        });

        formlyConfigProvider.setType({
            name: 'select',
            templateUrl: 'formlyBootstrap/select.type.html',
            wrapper: ['bootstrapLabel', 'bootstrapValidationStates'],
            defaultOptions: function defaultOptions(options) {
                /* jshint maxlen:195 */
                var ngOptions = options.templateOptions.ngOptions ||
                    'option[to.valueProp || \'value\'] as option[to.labelProp || \'name\'] group by option[to.groupProp || \'group\'] for option in to.options';
                return {
                    ngModelAttrs: _defineProperty({}, ngOptions, {
                        value: options.templateOptions.optionsAttr || 'ng-options'
                    })
                };
            },
            apiCheck: function apiCheck(check) {
                return {
                    templateOptions: {
                        options: check.arrayOf(check.object),
                        optionsAttr: check.string.optional,
                        labelProp: check.string.optional,
                        valueProp: check.string.optional,
                        groupProp: check.string.optional
                    }
                };
            }
        });

        formlyConfigProvider.setType({
            name: 'typeahead-single',
            extends: 'select',
            templateUrl: 'formlyBootstrap/typeahead-single.type.html'
        });
        formlyConfigProvider.setType({
            name: 'typeahead-single-async',
            extends: 'select',
            templateUrl: 'formlyBootstrap/typeahead-single-async.type.html'
        });
        formlyConfigProvider.setType({
            name: 'typeahead-multiple',
            extends: 'select',
            templateUrl: 'formlyBootstrap/typeahead-multiple.type.html'
        });
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }
        return obj;
    }
})();
