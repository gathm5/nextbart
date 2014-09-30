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
                        .get($api.trainCount(), {
                            transformResponse: function (data) {
                                console.log(data);
                                var json = $utilities.xml2json(data);
                                console.log('\n\n\n', json);
                                return json;
                            }
                        })
                        .success(function (data, status) {
                            deferred.resolve({
                                data: data,
                                status: status
                            });
                        })
                    return deferred.promise;
                }
            }
        }
    ]);
