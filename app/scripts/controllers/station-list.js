'use strict';

angular.module('nextBartApp')
    .controller('StationListCtrl', [
        '$scope',
        '$station',
        '$activeSearch',
        '$storage',
        '$geocode',
        '$calculator',
        '$state',
        '$stateParams',
        '$rootScope',
        function ($scope, $station, $activeSearch, $storage, $geocode, $calculator, $state, $stateParams, $rootScope) {
            var mode = $stateParams.mode;

            var stations, position;

            function findBartStation() {
                var bart = {
                    position: position,
                    stations: $scope.stations.list
                };
                $calculator.$nearest(bart);
                $scope.stations.list = bart.stations;
                $scope.loading = false;
            }

            $scope.stations = {
                list: $storage.getData('station-list', $storage.PERSISTENT)
            };

            if (!$scope.stations.list) {
                $station.stations().then(function (stations) {
                    $scope.stations.list = stations.data.root.stations.station;
                    $storage.storeData('station-list', stations.data.root.stations.station, $storage.PERSISTENT);
                });
            }
            $scope.stations.select = function (station) {
                if (mode === 'origin') {
                    $activeSearch.setFrom(station);
                }
                else if (mode === 'destination') {
                    $activeSearch.setTo(station);
                }
                $state.go('dashboard');
            };

            $scope.locateStation = function () {
                $rootScope.$broadcast('$alert', {
                    message: 'sorting stations by your location..',
                    showTime: 5 * 1000
                });
                $geocode
                    .geocode($scope, {
                        timeout: 10 * 1000
                    })
                    .then(function (pos) {
                        position = pos.coords;
                        findBartStation();
                    },
                    function (reason) {
                        $scope.loading = false;
                        $scope.reason = reason;
                        $rootScope.$broadcast('$alert', {
                            message: reason,
                            showTime: 3 * 1000
                        });
                    });
            };
        }
    ]);