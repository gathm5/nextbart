'use strict';

angular
    .module('nextBartApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ngTouch',
        'ngAnimate',
        'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $compileProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('dashboard', {
                url: '/',
                views: {
                    'HomeView@': {
                        templateUrl: '/views/dashboard.html',
                        controller: 'DashboardCtrl'
                    }
                }
            })
            .state('details', {
                url: '/details/:id',
                views: {
                    'HomeView@': {
                        templateUrl: '/views/route-details.html',
                        controller: 'RouteDetailsCtrl'
                    }
                }
            })
            .state('stations', {
                url: '/stations/:mode',
                views: {
                    'HomeView@': {
                        templateUrl: '/views/station-list.html',
                        controller: 'StationListCtrl'
                    }
                }
            })
            .state('fare', {
                url: '/fare',
                views: {
                    'HomeView@': {
                        templateUrl: '/views/fare-calculator.html',
                        controller: 'FareCalculatorCtrl'
                    }
                }
            })
            .state('location', {
                url: '/locate',
                views: {
                    'HomeView@': {
                        templateUrl: '/views/find-bart-station.html',
                        controller: 'FindBartStationCtrl'
                    }
                }
            })
            .state('menu', {
                url: '/menu',
                views: {
                    'HomeView@': {
                        templateUrl: '/views/menu-panel.html',
                        controller: 'MenuPanelCtrl'
                    }
                }
            })
            .state('schedules', {
                url: '/schedules',
                views: {
                    'HomeView@': {
                        templateUrl: '/views/schedules.html',
                        controller: 'SchedulesCtrl'
                    }
                }
            })
            .state('routes', {
                url: '/routes',
                views: {
                    'HomeView@': {
                        templateUrl: '/views/route-map.html',
                        controller: 'RouteMapCtrl'
                    }
                }
            });
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|geo|javascript):/);
    })
    .run(function ($rootScope, $state) {
        var backTimes = 0;
        $rootScope.$state = $state;
        $rootScope.back = function () {

        };
        document.addEventListener('menubutton', function (e) {
            e.preventDefault();
            $state.go('menu');
        }, false);

        document.addEventListener('backbutton', function (e) {
            e.preventDefault();
            if (backTimes === 1) {
                navigator.app.exitApp();
            }
            $rootScope.$broadcast('$alert', {
                message: 'Press back again to exit!'
            });
            backTimes += 1;
        }, false);

        document.body.style.minHeight = document.body.clientHeight + 'px';
    });