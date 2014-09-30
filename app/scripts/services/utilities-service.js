'use strict';

angular.module('nextBartApp')
    .service('$utilities', [
        function UtilitiesService() {
            // AngularJS will instantiate a singleton by calling "new" on this function
            function convertToJSON(xml) {
                var json = null;
                if (xml2json) {
                    json = xml2json(xml);
                }
                return json;
            }

            return {
                xml2json: convertToJSON
            };
        }
    ]);