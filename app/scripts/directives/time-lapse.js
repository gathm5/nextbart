'use strict';

angular.module('nextBartApp')
    .directive('timeLapse', [
        '$interval',
        function ($interval) {
            return {
                template: '<div class="time-lapse">{{time}}</div>',
                restrict: 'E',
                scope: {
                    timer: '@'
                },
                link: function postLink(scope, element, attr) {
                    var counter, calculatedTime, time, timePassed = scope.timer, regex = /^\d+$/;
                    function execute() {
                        if (!regex.test(timePassed)) {
                            scope.$emit('Next');
                            scope.time = timePassed;
                            return;
                        }
                        time = parseInt(timePassed) * 60;
                        calculatedTime = time;
                        function countdown() {
                            if (calculatedTime === 520) {
                                scope.$emit('Recall');
                            }
                            if (calculatedTime <= 0) {
                                $interval.cancel(counter);
                                scope.$emit('Lapsed');
                                return;
                            }
                            calculatedTime -= 1;
                            scope.time = calculatedTime;
                        }

                        counter = $interval(countdown, 1000);
                    }

                    execute();

                    attr.$observe('timer', function (timer) {
                        timePassed = timer;
                        $interval.cancel(counter);
                        execute();
                    });
                }
            };
        }
    ]);