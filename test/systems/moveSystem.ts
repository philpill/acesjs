import MoveSystem from '../../assets/ts/systems/move';
import Settings from '../../assets/ts/settings';

import * as chai from 'chai';

let assert = chai.assert;

describe('MoveSystem', () => {

    let settings: Settings;

    let system: MoveSystem;

    beforeEach(() => {

        settings = new Settings();

        system = new MoveSystem(settings);
    });

    describe('getVelocityX()', () => {

        it('should return greater value when isGrounded', () => {

            let groundedValue = system.getVelocityX(1, 1, 1, 1, true);

            let nonGroundedValue = system.getVelocityX(1, 1, 1, 1, false);

            assert.isTrue(groundedValue > nonGroundedValue, 'grounded horizontal velocity is not greater airborne velocity');
        });
    });

    describe('getPositionX()', () => {

        it('should not return less than zero', () => {

            let value = system.getPositionX(1, 1, -20, 1);

            assert.isTrue(value >= 0, 'x position is less than zero');
        });

        it('cannot be greater than the height of the map', () => {

            let value = system.getPositionX(1, 1, 800, 1);

            let max = settings.MAP[0] * settings.TILE - settings.TILE;

            assert.isTrue(value <= max, 'x position is greater than map height boundary');
        });
    });
});