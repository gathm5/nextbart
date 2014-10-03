'use strict';

angular.module('nextBartApp')
    .service('$geocode', [
        '$q',
        function GeoLocationService($q) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            return {
                geocode: function ($scope) {
                    var deferred = $q.defer();
                    if (navigator && navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            $scope.$apply(function () {
                                deferred.resolve(position);
                            });
                        }, function (error) {
                            switch (error.code) {
                                case 1:
                                    $scope.$apply(function () {
                                        deferred.reject('You have rejected access to your location');
                                    });
                                    break;
                                case 2:
                                    $scope.$apply(function () {
                                        deferred.reject('Unable to determine your location');
                                    });
                                    break;
                                case 3:
                                    $scope.$apply(function () {
                                        deferred.reject('Service timeout has been reached');
                                    });
                                    break;
                            }
                        });
                    }
                    else {
                        $scope.$apply(function () {
                            deferred.reject('Browser does not support location services');
                        });
                    }
                    return deferred.promise;
                }
            };
        }
    ]);