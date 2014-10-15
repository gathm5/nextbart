'use strict';

angular.module('nextBartApp')
    .directive('clock', function ($interval) {
        return {
            templateUrl: 'views/directives/clock.html',
            restrict: 'E',
            replace: true,
            link: function postLink(scope, element, attrs) {
                var datetime, hours, minutes, seconds, mode, timer;

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
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    return {
                        hours: hours,
                        minutes: minutes,
                        mode: ampm
                    };
                }

                function calculate() {
                    datetime = new Date();
                    var date = formatAMPM(datetime);
                    hours = date.hours;
                    minutes = date.minutes;
                    mode = date.mode;
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
                    timer.cancel();
                })

            }
        };
    });