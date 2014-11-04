'use strict';

describe('Filter: filterStationName', function () {

  // load the filter's module
  beforeEach(module('nextBartApp'));

  // initialize a new instance of the filter before each test
  var filterStationName;
  beforeEach(inject(function ($filter) {
    filterStationName = $filter('filterStationName');
  }));

  it('should return the input prefixed with "filterStationName filter:"', function () {
    var text = 'angularjs';
    expect(filterStationName(text)).toBe('filterStationName filter: ' + text);
  });

});
