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
            });
    });