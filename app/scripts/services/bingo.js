'use strict';

angular.module('bingoApp', [])
    .service('$bingo', function Bingo() {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var bingo = (function () {

            var game = {
                data: {},
                actions: {},
                board: []
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
                for (var prop in obj)
                    if (Math.random() < 1 / ++count)
                        result = prop;
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

            function constructBoard() {
                var board = [];
                board.push(generateData(5, 'b'));
                board.push(generateData(5, 'i'));
                board.push(generateData(5, 'n'));
                board.push(generateData(5, 'g'));
                board.push(generateData(5, 'o'));
                game.board = board;
            }

            game.data.b = generator(1, 15);
            game.data.i = generator(16, 15);
            game.data.n = generator(31, 15);
            game.data.g = generator(46, 15);
            game.data.o = generator(61, 15);

            game.actions.pick = generateData;
            game.actions.construct = constructBoard;

            return game;
        }());
        return bingo;
    });