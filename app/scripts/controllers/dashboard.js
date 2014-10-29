'use strict';

angular.module('nextBartApp')
    .controller('DashboardCtrl', [
        '$scope',
        '$activeSearch',
        '$favorite',
        '$estimate',
        '$timeout',
        function ($scope, $activeSearch, $favorite, $estimate, $timeout) {
            var estimate, plannerOptions = {
                before: 0,
                after: 5
            };

            var favorite = $favorite.get();
            var station = {
                origin: null,
                destination: null,
                results: []
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

            function searchBart() {
                $timeout(function () {
                    $estimate
                        .planner($scope.travel.origin.abbr, $scope.travel.destination.abbr, 'depart', plannerOptions)
                        .then(function (results) {
                            $scope.travel.results = results.data.root;
                            try {
                                $activeSearch.setRoutes(results.data.root.schedule.request.trip);
                                if ($scope.travel.results.schedule.request.trip.length) {
                                    var leg = $scope.travel.results.schedule.request.trip[0].leg;
                                    if (leg.length) {
                                        leg = leg[0];
                                    }
                                    var time = new Date(leg._origTimeDate + ' ' + leg._origTimeMin);
                                    var curTime = new Date();
                                    var seconds = Math.round((time - curTime) / (1000));
                                    var minutes = seconds / 60;
                                    if (minutes > 0) {
                                        $scope.travel.timer = Math.round(minutes);
                                    }
                                    else {
                                        $scope.travel.timer = 'Missed? Search again!';
                                    }
                                }
                            } catch (e) {
                                $scope.travel.timer = 'Scheduler not loaded';
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
            populate();
            $scope.travel.search = searchBart;
            $scope.travel.swap = swap;

            //findEstimation();

            $scope.$on('Recall', function () {
                //findEstimation();
            });
            $scope.$on('Next', function () {
                //findEstimation(true);
            });
            $scope.$on('Lapsed', function () {
                //findEstimation();
            });
        }
    ]);