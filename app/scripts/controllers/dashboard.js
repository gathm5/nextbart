'use strict';

angular.module('nextBartApp')
    .controller('DashboardCtrl', [
        '$scope',
        '$activeSearch',
        '$favoriteService',
        '$estimate',
        function ($scope, $activeSearch, $favoriteService, $estimate) {
            var estimate, plannerOptions = {
                before: 0,
                after: 5
            };

            var station = {
                origin: $activeSearch.from() || null,
                destination: $activeSearch.to() || null
            };

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
                $estimate
                    .planner($scope.travel.origin.abbr, $scope.travel.destination.abbr, 'depart', plannerOptions)
                    .then(function (results) {
                        $scope.travel.results = results.data.root;
                        try {
                            if ($scope.travel.results.schedule.request.trip.leg._origTimeMin) {
                                var split = $scope.travel.results.schedule.request.trip.leg._origTimeMin.split(':');
                                $scope.travel.timer = parseInt(split[1]);
                            }
                        } catch (e) {
                        }
                    });
            }

            function swap() {
                var temp = $scope.travel.origin;
                $scope.travel.origin = $scope.travel.destination;
                $scope.travel.destination = temp;
                $scope.travel.results = null;
                $activeSearch.setFrom($scope.travel.origin);
                $activeSearch.setTo($scope.travel.destination);
            }

            //Scope Variables
            $scope.travel = station;
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