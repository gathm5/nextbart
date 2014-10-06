'use strict';

angular.module('nextBartApp')
    .service('$estimate', [
        '$api',
        '$utilities',
        function RealTimeEstimateService($api, $utilities) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            return {
                estimate: function (origin) {
                    return $utilities.$ajax({
                        url: $api.estimate(origin)
                    });
                }
            };
        }
    ]);