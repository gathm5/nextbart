'use strict';

angular.module('nextBartApp')
    .directive('travelTimeDisplay', function () {
        return {
            templateUrl: '/views/directives/travel-time-display.html',
            restrict: 'E',
            replace: true,
            scope: {
                trip: '='
            },
            link: function postLink(scope) {
                var trip = scope.trip;
                if (trip) {
                    var originTime = moment(trip._origTimeDate + ' ' + trip._origTimeMin);
                    var destTime = moment(trip._destTimeDate + ' ' + trip._destTimeMin);
                    var diff = destTime.diff(originTime);
                    var d = moment.duration(diff);
                    scope.hours = Math.floor(d.asHours()) % 25;
                    scope.mins = moment.utc(diff).format('mm');
                }
            }
        };
    });