'use strict';

angular.module('nextBartApp')
    .controller('MenuPanelCtrl', [
        '$scope',
        '$state',
        '$window',
        '$config',
        function ($scope, $state, $window, $config) {

            function go(state) {
                return function () {
                    $state.go(state);
                }
            }

            function rateThis() {
                $window.open('market://details?id=' + $config.package.name);
            }

            $scope.menus = [
                {
                    title: 'Dashboard',
                    state: go('dashboard')
                },
                {
                    title: 'Nearest',
                    state: go('location')
                },
                {
                    title: 'Route Map',
                    state: go('routes')
                },
                {
                    title: 'Rate this App',
                    state: rateThis
                }
            ];

            var menuIcons = ['fa-bus', 'fa-map-marker', 'fa-map-marker', 'fa-star'];
            for (var i = 0; i < $scope.menus.length; i += 1) {
                $scope.menus[i].icon = menuIcons[i];
            }
        }
    ]);