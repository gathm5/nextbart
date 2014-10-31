'use strict';

angular.module('nextBartApp')
    .directive('appLoadCloak', function () {
        return {
            restrict: 'A',
            link: function postLink(scope, element) {
                scope.$evalAsync(function () {
                    element.removeAttr('data-app-load-cloak');
                });
            }
        };
    });
