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
            var estimate, plannerOptions = {
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

            function findEstimation(next) {
                if ($scope.travel.origin) {
                    $estimate
                        .estimate($scope.travel.origin.abbr)
                        .then(function (estimated) {
                            var idx = 0;
                            estimate = estimated.data.root.station;
                            if (next) {
                                idx = 1;
                            }
                            if (estimate.etd && angular.isArray(estimate.etd) && estimate.etd.length > 0) {
                                //$scope.travel.destination = estimate.etd[idx].destination;
                                $scope.travel.timer = estimate.etd[idx].estimate[idx].minutes;
                            }
                            else if (estimate.etd) {
                                //$scope.travel.destination = estimate.etd.destination;
                                $scope.travel.timer = estimate.etd.estimate.minutes;
                            }
                            else {
                                $scope.travel.noSchedule = 'No barts';
                            }
                        });
                }
            }

            function searchBart(flag) {
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
                                    var leg = $scope.travel.results.schedule.request.trip[0].leg;
                                    if (leg.length) {
                                        leg = leg[0];
                                    }
                                    $scope.travel.timer = {
                                        success: true,
                                        date: leg._origTimeDate,
                                        time: leg._origTimeMin,
                                        message: 'Missed?',
                                        blink: 'Arriving'
                                    };
                                }
                            } catch (e) {
                                $scope.travel.timer = {
                                    success: false,
                                    message: 'no timer',
                                    display: true
                                };
                                if (flag) {
                                    $scope.travel.timer.blink = true;
                                    $scope.travel.timer.message = 'arriving';
                                }
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