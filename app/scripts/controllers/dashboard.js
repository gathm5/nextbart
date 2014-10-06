'use strict';

angular.module('nextBartApp')
    .controller('DashboardCtrl', [
        '$scope',
        '$activeSearch',
        '$favoriteService',
        '$estimate',
        function ($scope, $activeSearch, $favoriteService, $estimate) {
            var estimate;

            var station = {
                origin: $activeSearch.from() || null,
                destination: $activeSearch.to() || null
            };

            function findEstimation(next) {
                if ($scope.travel.origin) {
                    $estimate
                        .estimate()
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

            findEstimation();

            //Scope Variables
            $scope.travel = station;

            $scope.$on('Recall', function () {
                findEstimation();
            });
            $scope.$on('Next', function () {
                findEstimation(true);
            });
            $scope.$on('Lapsed', function () {
                findEstimation();
            });
        }
    ]);