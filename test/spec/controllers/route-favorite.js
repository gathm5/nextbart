'use strict';

describe('Controller: RouteFavoriteCtrl', function () {

  // load the controller's module
  beforeEach(module('nextBartApp'));

  var RouteFavoriteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RouteFavoriteCtrl = $controller('RouteFavoriteCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
