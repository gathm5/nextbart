'use strict';

describe('Service: TrainScheduleService', function () {

  // load the service's module
  beforeEach(module('nextBartApp'));

  // instantiate service
  var TrainScheduleService;
  beforeEach(inject(function (_TrainScheduleService_) {
    TrainScheduleService = _TrainScheduleService_;
  }));

  it('should do something', function () {
    expect(!!TrainScheduleService).toBe(true);
  });

});
