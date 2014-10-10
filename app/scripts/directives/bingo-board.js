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
                $scope.selected = [];
                $scope.select = function (item) {
                    $scope.selected.push(item);
                }
            }
        };
    });