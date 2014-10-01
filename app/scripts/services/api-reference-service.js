'use strict';

angular.module('nextBartApp')
    .service('$api', function ApiReferenceService() {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var key2 = 'ZMLV-UA93-ILNQ-DT35';
        var key = 'MW9S-E7SL-26DU-VV8V';

        var api = {
            count: function () {
                return 'http://api.bart.gov/api/bsa.aspx?cmd=count&key=' + key;
            },
            routes: function () {
                return 'http://api.bart.gov/api/route.aspx?cmd=routes&key=' + key;
            },
            routeInfo: function (route) {
                if (!route) {
                    route = 6;
                }
                return 'http://api.bart.gov/api/route.aspx?cmd=routeinfo&route=' + route + '&key=' + key;
            }
        };

        return api;
    });