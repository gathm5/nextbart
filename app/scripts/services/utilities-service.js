'use strict';

angular.module('nextBartApp')
    .service('$utilities', [
        '$http',
        '$q',
        '$storage',
        function UtilitiesService($http, $q, $storage) {
            // AngularJS will instantiate a singleton by calling 'new' on this function
            var x2js = new X2JS();
            var jsonObj;

            //Lat Long Calculation
            function distance(origin, destination, unit) {
                var ranLat1 = Math.PI * origin.latitude / 180;
                var radLat2 = Math.PI * destination.latitude / 180;
                //var radLong1 = Math.PI * lon1 / 180;
                //var radLong2 = Math.PI * lon2 / 180;
                var theta = origin.longitude - destination.longitude;
                var radTheta = Math.PI * theta / 180;
                var dist = Math.sin(ranLat1) * Math.sin(radLat2) + Math.cos(ranLat1) * Math.cos(radLat2) * Math.cos(radTheta);
                dist = Math.acos(dist);
                dist = dist * 180 / Math.PI;
                dist = dist * 60 * 1.1515;
                if (unit === 'K') {
                    dist = dist * 1.609344;
                }
                if (unit === 'N') {
                    dist = dist * 0.8684;
                }
                return dist;
            }

            // Ajax
            // Returns a promise
            function ajax(config) {
                var deferred = $q.defer();
                if (config.cache) {
                    var key = config.url;
                    var value = $storage.getData(key);
                    if (value) {
                        deferred.resolve({
                            data: value,
                            status: 200
                        });
                        return deferred.promise;
                    }
                }
                $http
                    .get(config.url, {
                        transformResponse: function (xml) {
                            jsonObj = x2js.xml_str2json(xml);
                            return jsonObj;
                        }
                    })
                    .success(function (data, status) {
                        deferred.resolve({
                            data: data,
                            status: status
                        });
                        if (config.cache) {
                            $storage.storeData(config.url, data);
                        }
                    })
                    .error(function (data, status) {
                        deferred.reject({
                            data: data,
                            status: status
                        });
                    });
                return deferred.promise;
            }

            return {
                $ajax: ajax,
                $distance: distance
            };
        }
    ]);