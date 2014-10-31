'use strict';

angular.module('nextBartApp')
    .filter('travelTimeFilter', function () {
        return function (trip) {
            if (trip) {
                var originTime = moment(trip._origTimeDate + ' ' + trip._origTimeMin);
                var destTime = moment(trip._destTimeDate + ' ' + trip._destTimeMin);
                var diff = destTime.diff(originTime, 'mins');
                /*var diffHrs = Math.round((diff % (86400 * 1000)) / (60 * 60 * 1000)); // hours
                var diffMin = Math.round(((diff % (86400 * 1000)) % (60 * 60 * 1000)) / (60 * 1000)); // minutes

                if (diffMin) {
                    return diffMin;
                }*/

                return diff;
            }
        };
    });