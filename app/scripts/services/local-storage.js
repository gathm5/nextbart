'use strict';

angular.module('nextBartApp')
    .service('$storage', [
        function StorageService() {
            // AngularJS will instantiate a singleton by calling "new" on this function
            var storage, storageMode, self;

            // bootstrap
            self = this;
            storage = {
                '0': window.sessionStorage,
                '1': window.localStorage
            };

            function objectify(data) {
                if (!data) {
                    return null;
                }
                if (typeof data === 'string') {
                    try {
                        data = JSON.parse(data);
                    }
                    catch (e) {

                    }
                }
                return data;
            }

            function stringify(data) {
                if (!data) {
                    return null;
                }
                if (typeof data === 'string') {
                    return data;
                }
                try {
                    data = JSON.stringify(data);
                }
                catch (e) {

                }
                return data;
            }

            function transfer(key, from, to) {
                var data;
                if ((data = storage[from].getItem(key))) {
                    self.storeData(key, data, to);
                    self.removeData(key, from);
                    return true;
                }
                return false;
            }

            self.SESSION = 0;
            self.PERSISTENT = 1;

            self.storeData = function (key, value, mode) {
                storageMode = self.SESSION;
                if (mode === self.PERSISTENT) {
                    storageMode = mode;
                }
                storage[storageMode].setItem(key, stringify(value));
            };

            self.getData = function (key, mode) {
                var data;
                storageMode = self.SESSION;
                if (mode) {
                    storageMode = mode;
                }
                if ((data = storage[storageMode].getItem(key))) {
                    return objectify(data);
                }
                storageMode = self.PERSISTENT;
                data = storage[storageMode].getItem(key);
                return objectify(data);
            };

            self.removeData = function (key, mode) {
                storageMode = self.SESSION;
                if (mode) {
                    storageMode = mode;
                }
                storage[storageMode].removeItem(key);
                return true;
            };

            self.removeAll = function () {
                function remove(key) {
                    for (var i in storage[key]) {
                        storage[key].removeItem(storage[key].key(i));
                    }
                }

                remove(self.SESSION);
                remove(self.PERSISTENT);
            };

            self.makePersistent = function (key) {
                return transfer(key, self.SESSION, self.PERSISTENT);
            };

            self.makeTemporary = function (key) {
                return transfer(key, self.PERSISTENT, self.SESSION);
            };
        }
    ]);