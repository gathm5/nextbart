'use strict';

describe('Filter: travelTimeFilter', function () {

  // load the filter's module
  beforeEach(module('nextBartApp'));

  // initialize a new instance of the filter before each test
  var travelTimeFilter;
  beforeEach(inject(function ($filter) {
    travelTimeFilter = $filter('travelTimeFilter');
  }));

  it('should return the input prefixed with "travelTimeFilter filter:"', function () {
    var text = 'angularjs';
    expect(travelTimeFilter(text)).toBe('travelTimeFilter filter: ' + text);
  });

});
