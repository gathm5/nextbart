'use strict';

angular.module('nextBartApp')
    .controller('DashboardCtrl', [
        '$scope',
        '$routeService',
        '$trainInfoService',
        '$scheduleService',
        function ($scope, $routeService, $trainInfoService, $scheduleService) {
            $trainInfoService.count().then(function (data) {
                $scope.train = data;
            });
            $routeService.routes().then(function (data) {
                $scope.routes = data;
            });
            $routeService.routeInfo(6).then(function (data) {
                $scope.routeInfo = data;
            });
            /*$scheduleService.arrive().then(function (data) {
                $scope.arrivals = data;
            });*/
        }
    ]);
