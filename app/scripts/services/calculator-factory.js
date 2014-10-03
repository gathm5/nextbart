'use strict';

angular.module('nextBartApp')
    .factory('$calculator', [
        '$utilities',
        function ($utilities) {

            //Private variables
            var locations = [], position, distance;

            //Helper functions
            function sort() {
                var origin, destination;
                for (var key in locations) {
                    origin = position;
                    destination = {
                        latitude: locations[key].gtfs_latitude,
                        longitude: locations[key].gtfs_longitude
                    };
                    distance = $utilities.$distance(origin, destination);
                    locations[key].distance = distance;
                }
                locations.sort(function (loc1, loc2) {
                    return (loc1.distance - loc2.distance);
                });
                return locations;
            }

            //Public functions
            function sortByDistance(bart) {
                locations = bart.stations;
                position = bart.position;
                return sort();
            }

            // Public API here
            return {
                $nearest: sortByDistance
            };
        }
    ]);