'use strict';

angular.module('nextBartApp')
    .controller('RouteDetailsCtrl', [
        '$scope',
        '$state',
        '$stateParams',
        '$activeSearch',
        '$trainRoute',
        function ($scope, $state, $stateParams, $activeSearch, $trainRoute) {
            var idx = $stateParams.id;
            var route = $activeSearch.getRoute(idx);
            var station = {};
            $scope.trip = route;

            function routeLines() {
                $trainRoute
                    .routes()
                    .then(function (routes) {
                        station.routes = routes.data.root.routes.route;
                    });
            }

            $scope.getColor = function (leg) {
                for (var i in station.routes) {
                    if (station.routes[i].routeID === leg._line) {
                        return {
                            color: station.routes[i].color
                        };
                    }
                }
                return {
                    display: 'none'
                };
            };

            routeLines();
        }
    ]);
