'use strict';

angular.module('nextBartApp')
    .service('$utilities', [
        function UtilitiesService() {
            // AngularJS will instantiate a singleton by calling "new" on this function
            var x2js = new X2JS();
            function convertToJSON(xml) {
                var jsonObj = x2js.xml_str2json(xml);
                return jsonObj;
            }

            return {
                xml2json: convertToJSON
            };
        }
    ]);