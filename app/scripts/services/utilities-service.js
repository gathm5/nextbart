'use strict';

angular.module('nextBartApp')
    .service('$utilities', [
        '$http',
        '$q',
        function UtilitiesService($http, $q) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            var x2js = new X2JS();

            function convertToJSON(xml) {
                var jsonObj = x2js.xml_str2json(xml);
                return jsonObj;
            }

            // Returns a promise
            function ajax(config) {
                var deferred = $q.defer();
                $http
                    .get(config.url, {
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

            return {
                xml2json: convertToJSON,
                $ajax: ajax
            };
        }
    ]);