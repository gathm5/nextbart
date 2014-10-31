'use strict';

describe('Directive: appLoadCloak', function () {

  // load the directive's module
  beforeEach(module('nextBartApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<app-load-cloak></app-load-cloak>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the appLoadCloak directive');
  }));
});
