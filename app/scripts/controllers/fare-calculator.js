'use strict';

angular.module('nextBartApp')
    .controller('FareCalculatorCtrl', [
        '$scope',
        '$favoriteService',
        '$fare',
        function ($scope, $favoriteService, $fare) {
            var favorites = $favoriteService.favorite();
            $fare.fares(favorites.origin, favorites.destination).then(function (data) {
                $scope.fare = data.data.root.trip.fare;
            });
        }
    ]);