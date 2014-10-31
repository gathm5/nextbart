'use strict';

angular.module('nextBartApp')
    .controller('SchedulesCtrl', [
        '$scope',
        function ($scope) {
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        }
    ]);