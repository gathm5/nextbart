'use strict';

angular.module('nextBartApp')
    .directive('baDepartInfo', function () {
        return {
            templateUrl: '/views/directives/ba-depart-info.html',
            restrict: 'E',
            replace: true,
            scope: {
                trip: '='
            },
            link: function postLink(scope, element, attrs) {
                console.log(scope.trip);
            }
        };
    });
