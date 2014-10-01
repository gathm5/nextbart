'use strict';

angular.module('nextBartApp')
    .service('$routeService', [
        '$api',
        '$utilities',
        function TrainRoutesService($api, $utilities) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            return {
                routes: function () {
                    return $utilities.$ajax({
                        url: $api.routes()
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