'use strict';

describe('Service: ApiReferenceService', function () {

  // load the service's module
  beforeEach(module('nextBartApp'));

  // instantiate service
  var ApiReferenceService;
  beforeEach(inject(function (_ApiReferenceService_) {
    ApiReferenceService = _ApiReferenceService_;
  }));

  it('should do something', function () {
    expect(!!ApiReferenceService).toBe(true);
  });

});
