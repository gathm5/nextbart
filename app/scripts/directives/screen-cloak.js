'use strict';

angular.module('nextBartApp')
    .directive('screenCloak', [
        '$timeout',
        function ($timeout) {
            return {
                restrict: 'EA',
                link: function postLink(scope, element) {
                    $timeout(function () {
                        element.addClass('screen-cloaked');
                    }, 100);
                }
            };
        }
    ]);