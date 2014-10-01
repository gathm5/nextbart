'use strict';

describe('Service: FavoriteRouteService', function () {

  // load the service's module
  beforeEach(module('nextBartApp'));

  // instantiate service
  var FavoriteRouteService;
  beforeEach(inject(function (_FavoriteRouteService_) {
    FavoriteRouteService = _FavoriteRouteService_;
  }));

  it('should do something', function () {
    expect(!!FavoriteRouteService).toBe(true);
  });

});
