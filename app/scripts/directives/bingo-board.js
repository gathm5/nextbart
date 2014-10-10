'use strict';

angular.module('bingoApp')
    .directive('bingoBoard', function () {
        return {
            restrict: 'EA',
            templateUrl: 'views/directives/bingo-board.html',
            scope: {
                board: '='
            },
            controller: function ($scope) {
                $scope.select = function (item) {
                    console.log(item, 'is clicked');
                }
            }
        };
    });