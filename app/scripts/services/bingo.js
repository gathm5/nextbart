'use strict';

angular.module('bingoApp', [])
    .service('$bingo', function Bingo() {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var bingo = (function () {

            var game = {
                data: {},
                actions: {},
                board: [],
                pattern: []
            };

            function generator(start, length) {
                var result = [];
                for (var i = 0; i < length; i += 1) {
                    result.push(start + i);
                }
                return result;
            }

            function pickRandomProperty(obj) {
                var result;
                var count = 0;
                for (var prop in obj) {
                    if (Math.random() < 1 / ++count) {
                        result = prop;
                    }
                }
                return result;
            }

            function generateData(length, pick) {
                var data = [], item, items, id, insert;
                if (length > 75) {
                    length = 75;
                }
                for (var i = 0; i < 75; i += 1) {
                    if (!pick) {
                        id = pickRandomProperty(game.data);
                    }
                    else {
                        id = pick;
                    }
                    items = game.data[id];
                    item = items[Math.floor(Math.random() * items.length)];
                    insert = id + item;
                    if (data.indexOf(insert) === -1) {
                        data.push(insert);
                    }
                    if (data.length >= length) {
                        break;
                    }
                }
                return data;
            }

            function winningPattern() {
                var straight = [], diagonal = [], scattered = [];

                function straighten(start, side) {

                    var result = [];
                    for (var i = 0; i < 5; i += 1) {
                        if (side === 0) {
                            result.push([start, i]);
                        }
                        else {
                            result.push([i, start]);
                        }
                    }
                    return result;

                }

                function diagonalize(start, side) {
                    var result = [];
                    if (side === 0) {
                        for (var i = 0; i < 5; i += 1) {
                            result.push([start, i]);
                            start += 1;
                        }
                        return result;
                    }
                    for (var i = 0; i < 5; i += 1) {
                        start -= 1;
                        result.push([start, i]);
                    }
                    return result;
                }

                straight.push(straighten(0, 0));
                straight.push(straighten(0, 1));

                straight.push(straighten(1, 0));
                straight.push(straighten(1, 1));

                straight.push(straighten(2, 0));
                straight.push(straighten(2, 1));

                straight.push(straighten(3, 0));
                straight.push(straighten(3, 1));

                straight.push(straighten(4, 0));
                straight.push(straighten(4, 1));

                diagonal.push(diagonalize(0, 0));
                diagonal.push(diagonalize(5, 1));

                game.pattern = {
                    straights: straight,
                    diagonals: diagonal
                };
            }

            function constructBoard() {
                var board = [];
                board.push(generateData(5, 'b'));
                board.push(generateData(5, 'i'));
                board.push(generateData(5, 'n'));
                board.push(generateData(5, 'g'));
                board.push(generateData(5, 'o'));
                game.board = board;
            }

            function bootstrap() {
                game.data.b = generator(1, 15);
                game.data.i = generator(16, 15);
                game.data.n = generator(31, 15);
                game.data.g = generator(46, 15);
                game.data.o = generator(61, 15);

                constructBoard();
                winningPattern();
                generateData();
            }
            bootstrap();
            return game;
        }());
        window.bingo = bingo;
        return bingo;
    });