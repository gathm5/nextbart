'use strict';

angular.module('nextBartApp')
    .service('$api', function ApiReferenceService() {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var key = 'ZMLV-UA93-ILNQ-DT35';

        var api = {
            count: function () {
                return 'http://api.bart.gov/api/bsa.aspx?cmd=count&key=' + key;
            },
            routes: function () {
                return 'http://api.bart.gov/api/route.aspx?cmd=routes&key=' + key;
            },
            routeInfo: function (route) {
                if (!route) {
                    route = 6;
                }
                return 'http://api.bart.gov/api/route.aspx?cmd=routeinfo&route=' + route + '&key=' + key;
            },
            schedule: {
                arrive: function (origin, destination) {
                    if (!origin) {
                        origin = 'ASHB';
                    }
                    if (!destination) {
                        destination = 'CIVC';
                    }
                    return 'http://api.bart.gov/api/sched.aspx?cmd=arrive&orig=' +
                        origin + '&dest=' + destination + '&date=now&key=' + key;
                },
                depart: function (origin, destination) {
                    if (!origin) {
                        origin = 'ASHB';
                    }
                    if (!destination) {
                        destination = 'CIVC';
                    }
                    return 'http://api.bart.gov/api/sched.aspx?cmd=arrive&orig=' +
                        origin + '&arrive=' + destination + '&date=now&key=' + key;
                }
            },
            fare: function (origin, destination) {
                if (!origin) {
                    origin = '12th';
                }
                if (!destination) {
                    destination = 'embr';
                }
                return 'http://api.bart.gov/api/sched.aspx?cmd=fare&orig=' +
                    origin + '&dest=' + destination + '&date=today&key=' + key;
            },
            stations: function () {
                return 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=' + key;
            },
            schedules: function (origin) {
                if (!origin) {
                    origin = '12th';
                }
                return 'http://api.bart.gov/api/sched.aspx?cmd=stnsched&orig=' + origin + '&key=' + key;
            },
            estimate: function (origin) {
                if (!origin) {
                    origin = 'RICH';
                }
                return 'http://api.bart.gov/api/etd.aspx?cmd=etd&orig=' + origin + '&key=' + key;
            },
            planner: function (origin, destination, mode) {
                if (!origin) {
                    origin = '12th';
                }
                if (!destination) {
                    destination = 'embr';
                }
                if (!mode) {
                    mode = 'arrive';
                }
                return 'http://api.bart.gov/api/sched.aspx?cmd=' + mode + '&orig=' + origin + '&dest=' + destination + '&key=' + key;
            }
        };

        return api;
    });