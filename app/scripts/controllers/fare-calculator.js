'use strict';

angular.module('nextBartApp')
    .controller('FareCalculatorCtrl', [
        '$scope',
        '$favoriteService',
        '$fareService',
        function ($scope, $favoriteService, $fareService) {
            var favorites = $favoriteService.favorite();
            $fareService.fares(favorites.origin, favorites.destination).then(function (data) {
                $scope.fare = data.data.root.trip.fare;
            });
        }
    ]);