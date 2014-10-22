'use strict';

angular.module('nextBartApp')
    .directive('watchClock', function ($interval) {
        return {
            templateUrl: '/views/directives/clock.html',
            restrict: 'E',
            link: function postLink(scope) {
                var datetime, timer, tempDate;

                scope.time = {};

                function formatAMPM(date) {
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var ampm = hours >= 12 ? 'pm' : 'am';
                    hours = hours % 12;
                    hours = hours ? hours : 12;
                    minutes = '00' + minutes;
                    minutes = minutes.slice(-2);
                    return {
                        hours: hours,
                        minutes: minutes,
                        mode: ampm
                    };
                }

                function calculate() {
                    datetime = new Date();
                    tempDate = formatAMPM(datetime);
                    scope.time = {
                        hours: tempDate.hours,
                        minutes: tempDate.minutes,
                        mode: tempDate.mode,
                        seconds: datetime.getSeconds()
                    };
                }

                calculate();

                timer = $interval(calculate, 1000);

                scope.$on('$destroy', function () {
                    $interval.cancel(timer);
                });

            }
        };
    });