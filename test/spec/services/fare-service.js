'use strict';

describe('Service: FareService', function () {

  // load the service's module
  beforeEach(module('nextBartApp'));

  // instantiate service
  var FareService;
  beforeEach(inject(function (_FareService_) {
    FareService = _FareService_;
  }));

  it('should do something', function () {
    expect(!!FareService).toBe(true);
  });

});
