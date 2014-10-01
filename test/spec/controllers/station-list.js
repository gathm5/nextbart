'use strict';

describe('Controller: StationListCtrl', function () {

  // load the controller's module
  beforeEach(module('nextBartApp'));

  var StationListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StationListCtrl = $controller('StationListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
