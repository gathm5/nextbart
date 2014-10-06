'use strict';

angular
    .module('nextBartApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ngTouch',
        'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('dashboard', {
                url: '/',
                views: {
                    'HomeView@': {
                        templateUrl: 'views/dashboard.html',
                        controller: 'DashboardCtrl'
                    }
                }
            })
            .state('stations', {
                url: '/stations/:mode',
                views: {
                    'HomeView@': {
                        templateUrl: 'views/station-list.html',
                        controller: 'StationListCtrl'
                    }
                }
            })
            .state('fare', {
                url: '/fare',
                views: {
                    'HomeView@': {
                        templateUrl: 'views/fare-calculator.html',
                        controller: 'FareCalculatorCtrl'
                    }
                }
            })
            .state('location', {
                url: '/locate',
                views: {
                    'HomeView@': {
                        templateUrl: 'views/find-bart-station.html',
                        controller: 'FindBartStationCtrl'
                    }
                }
            });
    })
    .run(function ($rootScope, $state) {
        $rootScope.$state = $state;
    });