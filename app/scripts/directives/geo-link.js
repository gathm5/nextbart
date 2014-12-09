'use strict';

angular.module('nextBartApp')
    .directive('geoLink', [
        '$config',
        function ($config) {

            /*
             <a href="maps://?q=dallas" data-rel="external">iOS launch in apple maps</a>
             <a href="comgooglemaps://?q=dallas" data-rel="external">iOS launch in google maps</a>
             <a href="geo://0,0?q=dallas" data-rel="external">Android launch in google maps</a>
             */

            return {
                template: function () {
                    var link = '<a class="map-link" ' +
                        'data-ng-href="{{prefix}}{{geo.gtfs_latitude}},{{geo.gtfs_longitude}}{{suffix}}" ' +
                        'data-rel="external" data-ng-transclude target="_blank"></a>';
                    return link;
                },
                restrict: 'E',
                transclude: true,
                replace: true,
                scope: {
                    geo: '='
                },
                link: function (scope) {
                    var deviceType = document.body.dataset.platform || 'web';
                    switch (deviceType) {
                        case 'android':
                            scope.prefix = 'geo:';
                            scope.suffix = '?q={{geo.name}}+bart+station';
                            break;
                        case 'ios':
                            /*scope.prefix = 'http://maps.apple.com/?q=';
                             scope.suffix = '&near={{geo.name}}+bart+station';*/
                            scope.prefix = 'javascript:window.open("http://maps.apple.com/?q=';
                            scope.suffix = '", "_blank", "location=yes,toolbar=yes,closebuttoncaption=\'back\'")';
                            break;
                        default:
                            scope.prefix = $config.map.linkType1;
                    }
                }
            };
        }
    ]);