'use strict';

angular.module('nextBartApp')
    .service('$favorite', [
        '$storage',
        '$station',
        function FavoriteRouteService($storage, $station) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            var favorites = $storage.getData('favorites', $storage.PERSISTENT);

            function set(favorites) {
                $storage.storeData('favorites', favorites, $storage.PERSISTENT);
            }

            function get() {
                if (!favorites) {
                    favorites = {};
                }
                return favorites;
            }

            return {
                get: get,
                set: set
            };
        }
    ]);