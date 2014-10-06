'use strict';

angular.module('nextBartApp')
    .controller('StationListCtrl', [
        '$scope',
        '$station',
        '$activeSearch',
        '$state',
        '$stateParams',
        function ($scope, $station, $activeSearch, $state, $stateParams) {
            var mode = $stateParams.mode;
            $scope.stations = {};
            $scope.stations.mode = mode;
            $station.stations().then(function (stations) {
                $scope.stations.list = stations.data.root.stations.station;
            });
            $scope.stations.select = function (station) {
                if (mode === 'origin') {
                    $activeSearch.setFrom(station);
                }
                else if (mode === 'destination') {
                    $activeSearch.setTo(station);
                }
                $state.go('dashboard');
            };
        }
    ]);