'use strict';

describe('Controller: FindBartStationCtrl', function () {

  // load the controller's module
  beforeEach(module('nextBartApp'));

  var FindBartStationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FindBartStationCtrl = $controller('FindBartStationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
