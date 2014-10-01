'use strict';

angular.module('nextBartApp')
    .controller('StationListCtrl', [
        '$scope',
        '$stationService',
        function ($scope, $stationService) {
            $stationService.stations().then(function (stations) {
                $scope.stations = stations.data.root.stations.station;
            });
        }
    ]);