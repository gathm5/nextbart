'use strict';

angular.module('nextBartApp')
    .service('$favoriteService', [
        '$storage',
        '$stationService',
        function FavoriteRouteService($storage, $stationService) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            var favorites = {};
            $stationService.stations().then(function (data) {
                var stations = data.data.root.stations.station;
                favorites.origin = stations[0];
                favorites.destination = stations[4];
            });
            return {
                favorite: function () {
                    return favorites;
                }
            }
        }
    ]);