"use strict";
exports.__esModule = true;
var chai = require("chai");
var assert = chai.assert;
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            if ([1, 2, 3].indexOf(4) !== -1) {
                throw new Error('thing1');
            }
        });
    });
});
