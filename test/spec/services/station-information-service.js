'use strict';

describe('Service: StationInformationService', function () {

  // load the service's module
  beforeEach(module('nextBartApp'));

  // instantiate service
  var StationInformationService;
  beforeEach(inject(function (_StationInformationService_) {
    StationInformationService = _StationInformationService_;
  }));

  it('should do something', function () {
    expect(!!StationInformationService).toBe(true);
  });

});
