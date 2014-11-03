'use strict';

angular.module('nextBartApp')
    .directive('viewPortControl', function ($document) {
        return {
            restrict: 'E',
            link: function postLink(scope) {
                var doc = $document.getElementById('viewport');
                doc.setAttribute('content', 'width=device-width,, height=device-height, initial-scale=1, maximum-scale=1');
                scope.$on('$destroy', function () {
                    doc.setAttribute('content', 'width=device-width, height=device-height, maximum-scale=1');
                });
            }
        };
    });