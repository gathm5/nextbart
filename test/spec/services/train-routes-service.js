'use strict';

describe('Service: trainRoutesService', function () {

  // load the service's module
  beforeEach(module('nextBartApp'));

  // instantiate service
  var trainRoutesService;
  beforeEach(inject(function (_trainRoutesService_) {
    trainRoutesService = _trainRoutesService_;
  }));

  it('should do something', function () {
    expect(!!trainRoutesService).toBe(true);
  });

});
