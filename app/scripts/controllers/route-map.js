'use strict';

angular.module('nextBartApp')
    .controller('RouteMapCtrl', [
        '$scope',
        '$state',
        function ($scope, $state) {
            $scope.back = {
                action: function () {
                    $state.go('menu');
                },
                label: 'back',
                title: 'Bart Catch'
            };
        }
    ]);