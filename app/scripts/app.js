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
            .state('home', {
                url: '/',
                views: {
                    'HomeView@': {
                        templateUrl: 'views/dashboard.html',
                        controller: 'DashboardCtrl'
                    }
                }
            })
            .state('stations', {
                url: '/stations',
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
            });
    });