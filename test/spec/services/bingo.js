'use strict';

describe('Service: Bingo', function () {

  // load the service's module
  beforeEach(module('nextBartApp'));

  // instantiate service
  var Bingo;
  beforeEach(inject(function (_Bingo_) {
    Bingo = _Bingo_;
  }));

  it('should do something', function () {
    expect(!!Bingo).toBe(true);
  });

});
