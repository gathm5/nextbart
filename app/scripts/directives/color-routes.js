'use strict';

angular.module('nextBartApp')
    .directive('colorRoutes', [
        '$trainRoute',
        function ($trainRoute) {
            return {
                templateUrl: '/views/directives/color-routes.html',
                restrict: 'E',
                replace: true,
                link: function postLink(scope) {
                    var allRoutes;

                    function code(routes) {
                        allRoutes = routes.data.root.routes.route;
                        groupBy();
                    }

                    function groupBy() {
                        var routes = {};
                        for (var i = 0; i < allRoutes.length; i += 1) {
                            routes[allRoutes[i].color] = {
                                trip: allRoutes[i].name,
                                color: allRoutes[i].color
                            };
                        }
                        scope.codes = routes;
                        scope.allRoutes = allRoutes;
                    }

                    $trainRoute
                        .routes()
                        .then(function (routes) {
                            code(routes);
                        });
                }
            };
        }
    ]);
