'use strict';

angular.module('nextBartApp')
    .filter('stationName', [
        '$station',
        function ($station) {
            return function (name) {
                var stations = $station.cachedStations.data.root.stations.station;
                for (var i = 0; i < stations.length; i += 1) {
                    if (stations[i].abbr === name) {
                        return (stations[i].name);
                    }
                }
                return name;
            };
        }
    ]);