'use strict';

describe('Controller: RouteMapCtrl', function () {

  // load the controller's module
  beforeEach(module('nextBartApp'));

  var RouteMapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RouteMapCtrl = $controller('RouteMapCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
