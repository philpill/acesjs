describe('Array2', function() {
  describe('#indexOf()', function() {

    it('should not return -1 when the value is present', function() {
        if ([1,2,3].indexOf(3) === -1) {

            let thing = [1,2,3].indexOf(3);

            throw new Error('error: ' + thing);
        }
    });

    it('should not return -2 when the value is present', function() {
        if ([1,2,3].indexOf(3) === -2) {

            let thing = [1,2,3].indexOf(3);

            throw new Error('error: ' + thing);
        }
    });
  });
});