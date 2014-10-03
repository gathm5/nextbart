'use strict';

angular.module('nextBartApp')
    .controller('DashboardCtrl', [
        '$scope',
        '$trainRoute',
        '$trainInfo',
        '$trainSchedule',
        '$station',
        function ($scope, $trainRoute, $trainInfo, $trainSchedule, $station) {
            $trainInfo.count().then(function (data) {
                //$scope.train = data;
            });
            $trainRoute.routes().then(function (data) {
                //$scope.routes = data;
            });
            $trainRoute.routeInfo(6).then(function (data) {
                //$scope.routeInfo = data;
            });
            $station.schedules().then(function (schedules) {
                $scope.schedules = schedules;
            });
        }
    ]);
