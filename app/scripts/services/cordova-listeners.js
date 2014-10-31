'use strict';

angular.module('nextBartApp')
    .service('$deviceEvents', [
        '$rootScope',
        '$state',
        '$timeout',
        function CordovaListeners($rootScope, $state, $timeout) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            function listeners() {
                var backTimes = 0;
                document.addEventListener('menubutton', function (e) {
                    e.preventDefault();
                    $state.go('menu');
                }, false);

                document.addEventListener('backbutton', function (e) {
                    e.preventDefault();

                    switch ($state.current.name) {
                        case 'details':
                        case 'stations':
                        case 'fare':
                        case 'locations':
                        case 'menu':
                            $state.go('dashboard');
                            return;
                    }

                    if (backTimes === 1) {
                        navigator.app.exitApp();
                    }
                    $rootScope.$broadcast('$alert', {
                        message: 'Press back again to exit!'
                    });
                    backTimes += 1;
                    $timeout(function () {
                        backTimes = 0;
                    }, 5 * 1000);
                }, false);
            }

            this.init = function () {
                document.addEventListener('deviceready', function () {
                    listeners();
                });
            };
        }
    ]);