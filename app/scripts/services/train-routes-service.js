'use strict';

angular.module('nextBartApp')
    .service('$trainRoute', [
        '$api',
        '$utilities',
        function TrainRoutesService($api, $utilities) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            return {
                routes: function () {
                    return $utilities.$ajax({
                        url: $api.routes(),
                        cache: true
                    });
                },
                routeInfo: function (route) {
                    return $utilities.$ajax({
                        url: $api.routeInfo(route)
                    });
                }
            };
        }
    ]);