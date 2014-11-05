'use strict';

angular.module('nextBartApp')
    .directive('backButton', function ($state) {
        return {
            templateUrl: '/views/directives/back-button.html',
            restrict: 'E',
            scope: {
                back: '='
            },
            link: function postLink(scope) {
                var back = scope.back;
                if (!back) {
                    back = {
                        label: 'back',
                        title: 'Bart Catch'
                    };
                }
                scope.action = function () {
                    if (!back.action) {
                        back.action = function () {
                            $state.go('menu');
                        };
                    }
                    back.action();
                };
            }
        };
    });