'use strict';

angular.module('nextBartApp')
    .filter('travelTimeFilter', function () {
        return function (trip) {
            if (trip) {
                var originTime = moment(trip._origTimeDate + ' ' + trip._origTimeMin);
                var destTime = moment(trip._destTimeDate + ' ' + trip._destTimeMin);
                var diff = destTime.diff(originTime);
                var d = moment.duration(diff);
                return {
                    hours: Math.floor(d.asHours()),
                    minutes: moment.utc(diff).format(':mm:ss')
                };
            }
        };
    });