'use strict';

angular.module('nextBartApp')
    .controller('FindBartStationCtrl', [
        '$scope',
        '$geocode',
        '$station',
        '$calculator',
        function ($scope, $geocode, $station, $calculator) {
            var stations, position;

            function getStations(callback) {
                $station
                    .stations()
                    .then(function (data) {
                        stations = data.data.root.stations.station;
                        callback();
                    });
            }

            function findBartStation() {
                var bart = {
                    position: position,
                    stations: stations
                };
                $calculator.$nearest(bart);
                $scope.bart = bart;
                $scope.loading = false;
            }

            $scope.loading = true;

            $geocode
                .geocode($scope)
                .then(function (pos) {
                    position = pos.coords;
                    getStations(findBartStation);
                },
                function (reason) {
                    $scope.loading = false;
                    $scope.reason = reason;
                });

        }
    ]);