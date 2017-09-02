import MoveSystem from '../../assets/ts/systems/move';
import Settings from '../../assets/ts/settings';
import assert = require('assert');

describe('MoveSystem', () => {

    let settings: Settings;

    let system: MoveSystem;

    beforeEach(() => {

        settings = new Settings();

        system = new MoveSystem(settings);
    });

    xdescribe('getVelocityX()', () => {

        it('should return greater value when isGrounded', () => {

            let groundedValue = system.getVelocityX(1, 1, 1, 1, true);

            let nonGroundedValue = system.getVelocityX(1, 1, 1, 1, false);

            assert.equal(groundedValue > nonGroundedValue, true, 'grounded horizontal velocity is not greater airborne velocity');
        });
    });

   xdescribe('getPositionX()', () => {

        it('should not return less than zero', () => {

            let value = system.getPositionX(1, 1, -20, 1, 100);

            assert.equal(value >= 0, true, 'x position is less than zero');
        });

        it('cannot be greater than the height of the map', () => {

            let mapWidth =  100;

            let value = system.getPositionX(1, 1, 800, 1, mapWidth);

            let max = mapWidth * 16 - 16;

            assert.equal(value <= max, true, 'x position is greater than map height boundary');
        });
    });

    xdescribe('getVelocityY()', () => {

        it('should not be greater than 0.5', () => {

            let value = system.getVelocityY(2, 100, 2, false);

            assert.equal(value <= 0.5, true, 'y position is less than 0.5');
        });

        it('should not return negative if grounded', () => {

            let value = system.getVelocityY(2, -100, 2, true);

            assert.equal(value, 0, 'y velocity is negative');
        });
    });

    xdescribe('getPositionY()', () => {

        it('should not return fractions if grounded ', () => {

            let value = system.getPositionY(16, 1.5, 1.5, 1, true);

            assert.equal(Math.round(value), value, 'y position is not a whole number');
        });

        it('should not return less than zero', () => {

            let value = system.getPositionY(1, 1, -20, 1, true);

            assert.equal(value >= 0, true, 'y position is less than zero');
        });
    });
});