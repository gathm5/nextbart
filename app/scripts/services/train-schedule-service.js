'use strict';

angular.module('nextBartApp')
    .service('$scheduleService', [
        '$api',
        '$utilities',
        function TrainScheduleService($api, $utilities) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            return {
                arrive: function (origin, destination) {
                    return $utilities.$ajax({
                        url: $api.schedule.arrive(origin, destination)
                    });
                },
                depart: function (origin, destination) {
                    return $utilities.$ajax({
                        url: $api.schedule.depart(origin, destination)
                    });
                }
            };
        }
    ]);