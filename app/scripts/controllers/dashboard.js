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
                                var leg, legs, secondLeg;
                                $activeSearch.setRoutes(results.data.root.schedule.request.trip);
                                if ($scope.travel.results.schedule.request.trip.length) {
                                    legs = $scope.travel.results.schedule.request.trip[0].leg;
                                    if (legs.length) {
                                        leg = legs[0];
                                    }
                                    $scope.travel.timer = {
                                        success: true,
                                        date: leg._origTimeDate,
                                        time: leg._origTimeMin,
                                        message: 'Missed?',
                                        blink: 'Arriving'
                                    };
                                    legs = $scope.travel.results.schedule.request.trip[1].leg;
                                    if (legs.length) {
                                        secondLeg = legs[0];
                                    }
                                    if (secondLeg) {
                                        $scope.travel.timer.second = {
                                            success: true,
                                            date: secondLeg._origTimeDate,
                                            time: secondLeg._origTimeMin,
                                            message: 'Missed?',
                                            blink: 'Arriving'
                                        };
                                    }
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