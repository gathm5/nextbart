'use strict';

angular.module('nextBartApp')
    .controller('StationListCtrl', [
        '$scope',
        '$station',
        '$activeSearch',
        '$storage',
        '$state',
        '$stateParams',
        function ($scope, $station, $activeSearch, $storage, $state, $stateParams) {
            var mode = $stateParams.mode;
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
                    message: 'locating your nearest station..',
                    showTime: 5 * 1000
                });
            };
        }
    ]);