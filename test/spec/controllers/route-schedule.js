'use strict';

describe('Controller: RouteScheduleCtrl', function () {

  // load the controller's module
  beforeEach(module('nextBartApp'));

  var RouteScheduleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RouteScheduleCtrl = $controller('RouteScheduleCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
