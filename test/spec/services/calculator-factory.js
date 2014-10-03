'use strict';

describe('Service: calculatorFactory', function () {

  // load the service's module
  beforeEach(module('nextBartApp'));

  // instantiate service
  var calculatorFactory;
  beforeEach(inject(function (_calculatorFactory_) {
    calculatorFactory = _calculatorFactory_;
  }));

  it('should do something', function () {
    expect(!!calculatorFactory).toBe(true);
  });

});
