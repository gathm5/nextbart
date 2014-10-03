'use strict';

angular.module('nextBartApp')
    .service('$fare', [
        '$api',
        '$utilities',
        function FareService($api, $utilities) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            return {
                fares: function (origin, destination) {
                    return $utilities.$ajax({
                        url: $api.fare(origin, destination)
                    });
                }
            };
        }
    ]);