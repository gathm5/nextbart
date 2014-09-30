'use strict';

describe('Service: TrainInformationService', function () {

  // load the service's module
  beforeEach(module('nextBartApp'));

  // instantiate service
  var TrainInformationService;
  beforeEach(inject(function (_TrainInformationService_) {
    TrainInformationService = _TrainInformationService_;
  }));

  it('should do something', function () {
    expect(!!TrainInformationService).toBe(true);
  });

});
