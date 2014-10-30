'use strict';

describe('Service: CordovaListeners', function () {

  // load the service's module
  beforeEach(module('nextBartApp'));

  // instantiate service
  var CordovaListeners;
  beforeEach(inject(function (_CordovaListeners_) {
    CordovaListeners = _CordovaListeners_;
  }));

  it('should do something', function () {
    expect(!!CordovaListeners).toBe(true);
  });

});
