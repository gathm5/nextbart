'use strict';

angular.module('nextBartApp')
    .controller('FindBartStationCtrl', [
        '$scope',
        '$geocode',
        '$station',
        '$calculator',
        '$window',
        function ($scope, $geocode, $station, $calculator, $window) {
            var stations, position;

            function getStations(callback) {
                // Called 1st
                $station
                    .stations()
                    .then(function (data) {
                        stations = data.data.root.stations.station;
                        if (callback) {
                            callback();
                        }
                        else {
                            $scope.noPos = true;
                            $scope.bart = {
                                stations: stations
                            };
                        }
                    });
            }

            function findBartStation() {
                // Called 2nd
                var bart = {
                    position: position,
                    stations: stations
                };
                $calculator.$nearest(bart);
                $scope.bart = bart;
                $scope.loading = false;
            }

            function openInMaps(station) {
                $window.open('https://www.google.com/maps/place/' + station.name + '+bart+station', '_system');
            }

            $scope.loading = true;
            $scope.openInMaps = openInMaps;
            $scope.back = {
                title: 'Stations by your distance',
                label: ''
            };

            $geocode
                .geocode($scope)
                .then(function (pos) {
                    position = pos.coords;
                    getStations(findBartStation);
                },
                function (reason) {
                    $scope.loading = false;
                    $rootScope.$broadcast('$alert', {
                        message: reason,
                        showTime: 3 * 1000
                    });
                    getStations(false);
                });

        }
    ]);