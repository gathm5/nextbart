'use strict';

angular.module('nextBartApp')
    .directive('timeLapse', [
        '$timeout',
        '$interval',
        function ($timeout, $interval) {
            return {
                templateUrl: '/views/directives/time-lapse.html',
                restrict: 'E',
                scope: {
                    timer: '='
                },
                link: function postLink(scope) {
                    var counter, timePassed = scope.timer;

                    function execute() {
                        var then = new Date(timePassed.date + ' ' + timePassed.time);
                        var now = new Date();

                        var diffTime = then - now;
                        var duration = moment.duration(diffTime, 'ms');
                        var interval = 1000;

                        counter = $interval(function () {
                            duration = moment.duration(duration - interval, 'ms');
                            if (duration.milliseconds() < 0) {
                                scope.message = timePassed.message;
                                $interval.cancel(counter);
                                return;
                            }
                            scope.time = {
                                hours: duration.hours(),
                                minutes: duration.minutes(),
                                seconds: ('00' + duration.seconds()).slice(-2)
                            };
                        }, interval);
                    }

                    if (!timePassed.success) {
                        if (timePassed.display) {
                            scope.message = timePassed.message;
                        }
                        scope.$emit('Next');
                        return;
                    }

                    scope.$on('$destroy', function () {
                        $interval.cancel(counter);
                    });

                    scope.$watch('timer', function (updatedTimer) {
                        if (updatedTimer) {
                            timePassed = updatedTimer;
                            scope.message = null;
                            $interval.cancel(counter);
                            execute();
                        }
                    });
                }
            };
        }
    ]);