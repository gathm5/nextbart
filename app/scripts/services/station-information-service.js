'use strict';

angular.module('nextBartApp')
    .service('$station', [
        '$api',
        '$utilities',
        function StationInformationService($api, $utilities) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            var preloadedStations;
            return {
                stations: function () {
                    return $utilities.$ajax({
                        url: $api.stations(),
                        cache: true
                    });
                },
                schedules: function () {
                    return $utilities.$ajax({
                        url: $api.schedules()
                    });
                },
                cachedStations: preloadedStations
            };
        }
    ]);