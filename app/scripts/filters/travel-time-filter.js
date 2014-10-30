'use strict';

angular.module('nextBartApp')
    .filter('travelTimeFilter', function () {
        return function (trip) {
            if (trip) {
                var originTime = new Date(trip._origTimeDate + ' ' + trip._origTimeMin);
                var destTime = new Date(trip._destTimeDate + ' ' + trip._destTimeMin);
                var diff = destTime - originTime;
                var diffHrs = Math.round((diff % (86400 * 1000)) / (60 * 60 * 1000)); // hours
                var diffMin = Math.round(((diff % (86400 * 1000)) % (60 * 60 * 1000)) / (60 * 1000)); // minutes

                if (diffMin) {
                    return diffMin;
                }

                return diffHrs * 60;
            }
        };
    });