'use strict';

describe('Controller: PlayBoardCtrl', function () {

  // load the controller's module
  beforeEach(module('nextBartApp'));

  var PlayBoardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlayBoardCtrl = $controller('PlayBoardCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
