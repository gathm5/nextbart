'use strict';

angular.module('nextBartApp')
    .controller('DashboardCtrl', [
        '$scope',
        '$routeService',
        '$trainInfoService',
        function ($scope, $routeService, $trainInfoService) {
            $trainInfoService.count().then(function (data) {
                console.log('Count', data);
                $scope.train = data;
            });
            $routeService.routes().then(function (data) {
                console.log('Routes', data);
                $scope.routes = data;
            }, function (reason) {
                console.log('Rejected:', reason);
            });
            $routeService.routeInfo(6).then(function (data) {
                console.log('Route Info', data);
                $scope.routeInfo = data;
            });
        }
    ]);
