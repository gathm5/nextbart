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
                    var link = '<a class="map-link" '
                        + 'data-ng-href="{{prefix}}{{geo.gtfs_latitude}},{{geo.gtfs_longitude}}?q={{geo.name}}+bart+station" '
                        + 'data-rel="external" data-ng-transclude></a>';
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
                    scope.deviceType = deviceType;
                    switch (deviceType.toLowerCase()) {
                        case 'android':
                            scope.prefix = 'geo:';
                            break;
                        case 'ios':
                            scope.prefix = 'comgooglemaps://';
                            break;
                        default:
                            scope.prefix = $config.map.linkType1;
                    }
                }
            };
        }
    ]);