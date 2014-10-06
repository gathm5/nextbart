'use strict';

angular.module('nextBartApp')
    .service('$activeSearch', [
        function ActiveSearchService() {
            // AngularJS will instantiate a singleton by calling "new" on this function
            var from = null, to = null;
            return {
                from: function () {
                    return from;
                },
                to: function () {
                    return to;
                },
                setFrom: function (station) {
                    from = station;
                },
                setTo: function (station) {
                    to = station;
                }
            };
        }
    ]);