'use strict';

angular.module('nextBartApp')
    .directive('backButton', function () {
        return {
            templateUrl: '/views/directives/back-button.html',
            restrict: 'E',
            link: function postLink(scope, element, attr) {
                scope.back = function () {
                    scope.$eval(attr.go);
                };
            }
        };
    });