'use strict';

angular.module('bingoApp')
    .controller('PlayBoardCtrl', function ($scope, $bingo) {
        $scope.board = $bingo.board;
    });
