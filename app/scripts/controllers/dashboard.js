'use strict';

angular.module('nextBartApp')
    .controller('DashboardCtrl', [
        '$scope',
        '$trainInfoService',
        function ($scope, $trainInfoService) {
            $trainInfoService.count().then(function (data) {
                $scope.data = data;
            });
        }
    ]);
