'use strict';

angular.module('nextBartApp')
    .directive('timeLapse', [
        '$interval',
        function ($interval) {
            return {
                template: '<div class="time-lapse" data-ng-if="!passed">In {{show.min}}<span class="colon animation-blink">:</span>{{show.sec}}</div>' +
                    '<div class="time-lapse message" data-ng-if="passed">{{passed}}</div>',
                restrict: 'E',
                scope: {
                    timer: '@'
                },
                link: function postLink(scope, element, attr) {
                    var counter, calculatedTime, time, timePassed = scope.timer, regex = /^\d+$/;

                    function showTime(calculatedTime) {
                        var min = 0, sec = 0;
                        if (calculatedTime < 60) {
                            sec = calculatedTime;
                        }
                        else {
                            min = parseInt(calculatedTime / 60);
                            sec = calculatedTime % 60;
                        }
                        sec = '00' + sec;
                        scope.show = {
                            min: min,
                            sec: sec.slice(-2)
                        };
                    }

                    function execute() {
                        if (!regex.test(timePassed)) {
                            scope.$emit('Next');
                            scope.passed = timePassed;
                            return;
                        }
                        time = parseInt(timePassed) * 60;
                        calculatedTime = time;
                        showTime(calculatedTime);
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
                            showTime(calculatedTime);
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