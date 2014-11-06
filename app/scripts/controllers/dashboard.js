'use strict';

angular.module('nextBartApp')
    .controller('DashboardCtrl', [
        '$scope',
        '$activeSearch',
        '$favorite',
        '$estimate',
        '$trainRoute',
        '$timeout',
        function ($scope, $activeSearch, $favorite, $estimate, $trainRoute, $timeout) {
            var plannerOptions = {
                before: 0,
                after: 4,
                date: null
            };

            var favorite = $favorite.get();
            var station = {
                origin: null,
                destination: null,
                results: [],
                routes: null
            };

            function populate() {
                if ($activeSearch.from()) {
                    station.origin = $activeSearch.from();
                }
                if ($activeSearch.to()) {
                    station.destination = $activeSearch.to();
                }
                if (!station.origin && !station.destination) {
                    station.origin = favorite.origin;
                    station.destination = favorite.destination;
                }
                $scope.travel = station;
                if (station.origin && station.destination) {
                    searchBart();
                }
            }

            function timerData(trip, idx) {
                var leg = trip[idx].leg;
                if (leg && leg.length) {
                    leg = leg[0];
                }
                return {
                    success: true,
                    date: leg._origTimeDate,
                    time: leg._origTimeMin,
                    message: 'Missed?',
                    blink: 'Arriving'
                };
            }


            function searchBart() {
                $timeout(function () {
                    var date = moment($scope.advanced.date);
                    plannerOptions.date = date.format('MM/DD/YYYY');
                    plannerOptions.time = date.format('h:mm+a');
                    $trainRoute
                        .routes()
                        .then(function (routes) {
                            $scope.routes = routes;
                        });
                    $estimate
                        .planner($scope.travel.origin.abbr, $scope.travel.destination.abbr, 'depart', plannerOptions)
                        .then(function (results) {
                            $scope.loading = false;
                            $scope.travel.results = results.data.root;
                            try {
                                $activeSearch.setRoutes(results.data.root.schedule.request.trip);
                                if ($scope.travel.results.schedule.request.trip.length) {
                                    $scope.travel.timer = timerData(results.data.root.schedule.request.trip, 0);
                                    $scope.travel.timer.second = timerData(results.data.root.schedule.request.trip, 1);
                                    $scope.travel.timer.third = timerData(results.data.root.schedule.request.trip, 2);
                                    $scope.travel.timer.fourth = timerData(results.data.root.schedule.request.trip, 3);
                                }
                            } catch (e) {
                                $scope.travel.timer = {
                                    success: false,
                                    message: 'no timer',
                                    display: true
                                };
                            }
                        });
                    $favorite.set({
                        origin: $scope.travel.origin,
                        destination: $scope.travel.destination
                    });
                });
            }

            function swap() {
                var temp = $scope.travel.origin;
                $scope.travel.origin = $scope.travel.destination;
                $scope.travel.destination = temp;
                $scope.travel.results = [];
                $scope.travel.timer = null;
                $activeSearch.setFrom($scope.travel.origin);
                $activeSearch.setTo($scope.travel.destination);
            }

            //Scope Variables
            $scope.loading = true;
            populate();
            $scope.travel.search = searchBart;
            $scope.travel.swap = swap;
            $scope.advanced = {
                show: false,
                date: new Date()
            };
            $scope.showAdvancedOptions = function () {
                $scope.advanced.show = !$scope.advanced.show;
            };

            //findEstimation();

            $scope.$on('CHECK', function () {
                searchBart(true);
            });

            $scope.$on('MISSED', function () {
                //findEstimation();
            });
            $scope.$on('NEXT', function () {
                //findEstimation(true);
            });
            $scope.$on('Lapsed', function () {
                //findEstimation();
            });
        }
    ]);