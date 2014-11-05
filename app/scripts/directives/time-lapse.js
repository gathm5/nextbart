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
                            if (duration.days() !== 0) {
                                scope.hide = true;
                                $interval.cancel(counter);
                                return;
                            }
                            if (duration._milliseconds > 30 * 1000 && duration._milliseconds < 31 * 1000) {
                                scope.$emit('CHECK');
                            }
                            else if (duration._milliseconds < 30 * 1000 && duration._milliseconds > 0) {
                                scope.message = timePassed.blink;
                                scope.blink = true;
                            }
                            else if (duration._milliseconds < 0) {
                                scope.message = timePassed.message;
                                $interval.cancel(counter);
                                scope.$emit('MISSED');
                                scope.blink = false;
                                executeSecondLeg();
                                return;
                            }
                            scope.time = {
                                hours: duration.hours(),
                                minutes: duration.minutes(),
                                seconds: ('00' + duration.seconds()).slice(-2)
                            };
                        }, interval);
                    }

                    function executeSecondLeg() {
                        $timeout(function () {
                            scope.hide = false;
                            scope.blink = false;
                            timePassed = scope.timer.second;
                            scope.message = null;
                            $interval.cancel(counter);
                            execute();
                        }, 20 * 1000);
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
                            scope.hide = false;
                            scope.blink = false;
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