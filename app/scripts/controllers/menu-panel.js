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
                    icon: 'fa-bus',
                    state: go('dashboard')
                },
                {
                    title: 'Nearest',
                    icon: 'fa-map-marker',
                    state: go('location')
                },
                {
                    title: 'Route Map',
                    icon: 'fa-map-marker',
                    state: go('routes')
                },
                {
                    title: 'Rate this App',
                    icon: 'fa-star',
                    state: rateThis
                }
            ];


        }
    ]);