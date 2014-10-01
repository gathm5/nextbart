'use strict';

describe('Service: ActiveRouteService', function () {

  // load the service's module
  beforeEach(module('nextBartApp'));

  // instantiate service
  var ActiveRouteService;
  beforeEach(inject(function (_ActiveRouteService_) {
    ActiveRouteService = _ActiveRouteService_;
  }));

  it('should do something', function () {
    expect(!!ActiveRouteService).toBe(true);
  });

});
