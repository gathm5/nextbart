'use strict';

angular.module('nextBartApp')
    .directive('travelTimeDisplay', function () {
        return {
            template: '<span class="value travel-time"><span data-ng-if="hours"><span class="small">{{hours}} hrs</span></span><span class="small">, {{mins}} mins</span></span>',
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
                    scope.hours = Math.floor(d.asHours());
                    scope.mins = moment.utc(diff).format('mm');
                }
            }
        };
    });