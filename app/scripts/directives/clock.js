'use strict';

angular.module('nextBartApp')
    .directive('watchClock', function ($interval) {
        return {
            template: '<div class="clock">' +
                '<span>Now</span>' +
                '<span>{{time.hours}}</span>' +
                '<span class="colon animation-blink">:</span>' +
                '<span>{{time.minutes}}</span>' +
                '<span>{{time.mode}}</span>' +
                '</div>',
            restrict: 'E',
            link: function postLink(scope) {
                var datetime, hours, minutes, seconds, mode, timer, tempDate;

                scope.time = {
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds
                };

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
                    hours = tempDate.hours;
                    minutes = tempDate.minutes;
                    mode = tempDate.mode;
                    seconds = datetime.getSeconds();
                    scope.time = {
                        hours: hours,
                        minutes: minutes,
                        mode: mode,
                        seconds: seconds
                    };
                }

                calculate();

                timer = $interval(function () {
                    if (scope.time.seconds < 59) {
                        scope.time.seconds += 1;
                    }
                    else {
                        calculate();
                    }
                }, 1000);

                scope.$on('$destroy', function () {
                    $interval.cancel(timer);
                });

            }
        };
    });