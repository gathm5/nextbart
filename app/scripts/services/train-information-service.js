'use strict';

angular.module('nextBartApp')
    .service('$trainInfo', [
        '$api',
        '$utilities',
        function TrainInformationService($api, $utilities) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            return {
                count: function () {
                    return $utilities.$ajax({
                        url: $api.count()
                    });
                }
            };
        }
    ]);