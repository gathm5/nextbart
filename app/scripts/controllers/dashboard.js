'use strict';

angular.module('nextBartApp')
    .controller('DashboardCtrl', [
        '$scope',
        '$estimate',
        function ($scope, $estimate) {
            var estimate;

            function findEstimation(next) {
                $estimate
                    .estimate()
                    .then(function (estimated) {
                        var idx = 0;
                        estimate = estimated.data.root.station;
                        $scope.travel = {
                            origin: estimate.name
                        };
                        if (next) {
                            idx = 1;
                        }
                        if (estimate.etd && angular.isArray(estimate.etd) && estimate.etd.length > 0) {
                            $scope.travel.destination = estimate.etd[idx].destination;
                            $scope.travel.timer = estimate.etd[idx].estimate[idx].minutes;
                        }
                        else if (estimate.etd) {
                            $scope.travel.destination = estimate.etd.destination;
                            $scope.travel.timer = estimate.etd.estimate.minutes;
                        }
                        else {
                            $scope.travel.noSchedule = 'No barts';
                        }
                    });
            }

            findEstimation();
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