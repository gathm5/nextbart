'use strict';

angular.module('nextBartApp')
    .service('$routes', [
        '$api',
        '$http',
        '$utilities',
        '$q',
        function TrainRoutesService($api, $http, $utilities, $q) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            var deferred;
            return {
                routes: function () {
                    deferred = $q.defer();
                    $http
                        .get($api.routes(), {
                            transformResponse: function (xml) {
                                var x2js = new X2JS();
                                var jsonObj = x2js.xml_str2json(xml);
                                return jsonObj;
                            }
                        })
                        .success(function (data, status) {
                            deferred.resolve({
                                data: data,
                                status: status
                            });
                        })
                        .error(function (data, status) {
                            deferred.reject({
                                data: data,
                                status: status
                            });
                        });
                    return deferred.promise;
                },
                routeInfo: function (route) {
                    deferred = $q.defer();
                    $http
                        .get($api.routeInfo(route), {
                            transformResponse: function (xml) {
                                var x2js = new X2JS();
                                var jsonObj = x2js.xml_str2json(xml);
                                return jsonObj;
                            }
                        })
                        .success(function (data, status) {
                            deferred.resolve({
                                data: data,
                                status: status
                            });
                        })
                        .error(function (data, status) {
                            deferred.reject({
                                data: data,
                                status: status
                            });
                        });
                    return deferred.promise;
                }
            };
        }
    ]);