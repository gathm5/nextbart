'use strict';

angular.module('nextBartApp')
    .service('$favoriteService', [
        '$storage',
        '$station',
        function FavoriteRouteService($storage, $station) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            var favorites = {};
            $station.stations().then(function (data) {
                var stations = data.data.root.stations.station;
                favorites.origin = stations[0];
                favorites.destination = stations[4];
            });
            return {
                favorite: function () {
                    return favorites;
                }
            };
        }
    ]);