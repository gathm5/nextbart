'use strict';

describe('Service: realTimeEstimateService', function () {

  // load the service's module
  beforeEach(module('nextBartApp'));

  // instantiate service
  var realTimeEstimateService;
  beforeEach(inject(function (_realTimeEstimateService_) {
    realTimeEstimateService = _realTimeEstimateService_;
  }));

  it('should do something', function () {
    expect(!!realTimeEstimateService).toBe(true);
  });

});
