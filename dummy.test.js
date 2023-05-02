const assert = require('chai').assert;

describe('MyApp', function() {
  describe('addNumbers', function() {
    it('should add two numbers correctly', function() {
      const result = addNumbers(2, 3);
      assert.equal(result, 5);
    });
  });
});

// Your application code
function addNumbers(a, b) {
  return a + b;
}
