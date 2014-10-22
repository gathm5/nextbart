'use strict';

angular.module('nextBartApp')
    .service('$activeSearch', [
        function ActiveSearchService() {
            // AngularJS will instantiate a singleton by calling "new" on this function
            var from = null, to = null, routes;
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
                },
                getRoutes: function () {
                    return routes;
                },
                getRoute: function (key) {
                    return routes[key];
                },
                setRoutes: function (data) {
                    routes = data;
                }
            };
        }
    ]);