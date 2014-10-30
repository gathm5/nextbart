'use strict';

angular.module('nextBartApp')
    .controller('MenuPanelCtrl', [
        '$scope',
        function ($scope) {
            $scope.menus = [
                {
                    title: 'Dashboard',
                    icon: 'fa-bus',
                    state: 'dashboard'
                },
                {
                    title: 'Nearest',
                    icon: 'fa-map-marker',
                    state: 'location'
                },
                {
                    title: 'Schedules',
                    icon: 'fa-map-marker',
                    state: 'schedules'
                },
                {
                    title: 'Route Map',
                    icon: 'fa-map-marker',
                    state: 'routes'
                }
            ];
        }
    ]);