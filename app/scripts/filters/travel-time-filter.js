'use strict';

angular.module('nextBartApp')
    .filter('travelTimeFilter', function () {
        return function (trip) {
            if (trip) {
                var originTime = moment(trip._origTimeDate + ' ' + trip._origTimeMin);
                var destTime = moment(trip._destTimeDate + ' ' + trip._destTimeMin);
                var diff = destTime.diff(originTime, 'm');
                return diff;
            }
        };
    });