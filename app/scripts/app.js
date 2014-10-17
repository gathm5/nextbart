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
                        templateUrl: '/views/dashboard.html',
                        controller: 'DashboardCtrl'
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
            });
    })
    .run(function ($rootScope, $state) {
        $rootScope.$state = $state;
        document.addEventListener('menubutton', function (e) {
            e.preventDefault();
            $state.go('menu');
        }, false);
        document.getElementsByClassName('container')[0].style.minHeight = document.body.clientHeight + 'px';
        document.body.style.minHeight = document.body.clientHeight + 'px';
    });