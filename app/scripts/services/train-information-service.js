'use strict';

angular.module('nextBartApp')
    .service('$trainInfoService', [
        '$api',
        '$http',
        '$utilities',
        '$q',
        function TrainInformationService($api, $http, $utilities, $q) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            var deferred;
            return {
                count: function () {
                    deferred = $q.defer();
                    $http
                        .get($api.count(), {
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
                        });
                    return deferred.promise;
                }
            };
        }
    ]);