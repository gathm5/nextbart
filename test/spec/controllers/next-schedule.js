'use strict';

describe('Controller: NextScheduleCtrl', function () {

  // load the controller's module
  beforeEach(module('nextBartApp'));

  var NextScheduleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NextScheduleCtrl = $controller('NextScheduleCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
