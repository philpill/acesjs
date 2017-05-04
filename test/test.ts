import AnimationSystem from '../assets/ts/systems/animation';
import Settings from '../assets/ts/settings';

import * as chai from 'chai';

let assert = chai.assert;

describe('Array', function() {

  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {

        let settings = new Settings();

        let system = new AnimationSystem(settings);

        let val = system.test();

        console.log(val);

        assert.equal(val, 2);
    });
  });
});