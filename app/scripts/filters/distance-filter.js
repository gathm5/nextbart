'use strict';

angular.module('nextBartApp')
    .filter('distance', function () {
        return function (input) {
            return input.toFixed(2) + ' miles';
        };
    });