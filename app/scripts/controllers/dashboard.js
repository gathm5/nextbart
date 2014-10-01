'use strict';

angular.module('nextBartApp')
    .controller('DashboardCtrl', [
        '$scope',
        '$routes',
        '$trainInfoService',
        function ($scope, $routes, $trainInfoService) {
            $trainInfoService.count().then(function (data) {
                console.log('Count', data);
                $scope.train = data;
            });
            $routes.routes().then(function (data) {
                console.log('Routes', data);
                $scope.routes = data;
            }, function (reason) {
                console.log('Rejected:', reason);
            });
            $routes.routeInfo(6).then(function (data) {
                console.log('Route Info', data);
                $scope.routeInfo = data;
            });
        }
    ]);
