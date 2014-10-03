'use strict';

angular.module('nextBartApp')
    .directive('timeLapse', [
        function () {
            return {
                template: '<div class="time-lapse"></div>',
                restrict: 'E',
                scope: {
                    timer: '='
                },
                link: function postLink(scope, element, attrs) {
                    var time = 0.0, min = 0, sec = 0;
                    if (attrs.timer) {
                        time = attrs.timer;
                    }

                    if (time.indexOf('.') > -1) {
                        min = time.split('.')[0];
                        sec = time.split('.')[1];
                        min = parseInt(min);
                        sec = parseInt(sec);
                    }
                    else {
                        min = parseInt(time);
                    }

                    function timing() {
                        var seconds = 60;

                        function secondPassed() {
                            var minutes = Math.round((seconds - 30) / 60);
                            var remainingSeconds = seconds % 60;
                            if (remainingSeconds < 10) {
                                remainingSeconds = "0" + remainingSeconds;
                            }
                            document.getElementById('countdown').innerHTML = minutes + ":" + remainingSeconds;
                            if (seconds == 0) {
                                clearInterval(countdownTimer);
                                document.getElementById('countdown').innerHTML = "Buzz Buzz";
                            } else {
                                seconds--;
                            }
                        }

                        var countdownTimer = setInterval('secondPassed()', 1000);
                    }

                }
            };
        }
    ]);