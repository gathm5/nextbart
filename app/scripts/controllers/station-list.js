'use strict';

angular.module('nextBartApp')
    .controller('StationListCtrl', [
        '$scope',
        '$station',
        function ($scope, $station) {
            $station.stations().then(function (stations) {
                $scope.stations = stations.data.root.stations.station;
            });
            $station.schedules().then(function (schedules) {
                $scope.schedules = schedules.data.root.station.item;
            });
        }
    ]);