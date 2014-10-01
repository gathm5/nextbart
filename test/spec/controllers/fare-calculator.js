'use strict';

describe('Controller: FareCalculatorCtrl', function () {

  // load the controller's module
  beforeEach(module('nextBartApp'));

  var FareCalculatorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FareCalculatorCtrl = $controller('FareCalculatorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
