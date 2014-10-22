'use strict';

describe('Controller: RouteDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('nextBartApp'));

  var RouteDetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RouteDetailsCtrl = $controller('RouteDetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
