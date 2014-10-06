'use strict';

describe('Service: ActiveSearchService', function () {

  // load the service's module
  beforeEach(module('nextBartApp'));

  // instantiate service
  var ActiveSearchService;
  beforeEach(inject(function (_ActiveSearchService_) {
    ActiveSearchService = _ActiveSearchService_;
  }));

  it('should do something', function () {
    expect(!!ActiveSearchService).toBe(true);
  });

});
