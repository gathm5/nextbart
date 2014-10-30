'use strict';

angular.module('nextBartApp')
    .directive('webIntent', [
        '$timeout',
        function ($timeout) {
            return {
                templateUrl: '/views/directives/web-intent.html',
                restrict: 'E',
                replace: true,
                controller: function postLink($scope) {
                    var timer;
                    $scope.$on('$alert', function (event, message) {
                        var display = 10 * 1000;
                        if (message.showTime) {
                            display = message.showTime;
                        }
                        $scope.message = message.message;
                        $timeout.cancel(timer);
                        timer = $timeout(function () {
                            $scope.message = null;
                        }, display);
                    });
                }
            };
        }
    ]);