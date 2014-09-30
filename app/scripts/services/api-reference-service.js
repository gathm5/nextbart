'use strict';

angular.module('nextBartApp')
    .service('$api', function ApiReferenceService() {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var key = 'MW9S-E7SL-26DU-VV8V';

        var api = {
            trainCount: function () {
                return 'http://api.bart.gov/api/bsa.aspx?cmd=count&key=' + key;
            }
        };

        return api;
    });