'use strict';

angular.module('nextBartApp')
    .service('$api', function ApiReferenceService() {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var key = 'ZMLV-UA93-ILNQ-DT35';

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
            },
            schedule: {
                arrive: function (origin, destination) {
                    if (!origin) {
                        origin = 'ASHB';
                    }
                    if (!destination) {
                        destination = 'CIVC';
                    }
                    return 'http://api.bart.gov/api/sched.aspx?cmd=arrive&orig=' +
                        origin + '&dest=' + destination + '&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1';
                }
            }
        };

        return api;
    });