'use strict';

angular.module('nextBartApp')
    .directive('webIntent', [
        '$rootScope',
        '$timeout',
        function ($rootScope, $timeout) {
            return {
                templateUrl: '/views/directives/web-intent.html',
                restrict: 'E',
                replace: true,
                controller: function postLink($scope) {
                    $scope.$on('$alert', function (event, message) {
                        var display = 10 * 1000;
                        if (message.showTime) {
                            display = message.showTime;
                        }
                        $scope.message = message.message;
                        $timeout(function () {
                            $scope.message = null;
                        }, display);
                    });
                }
            };
        }
    ]);