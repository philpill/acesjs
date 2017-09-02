import CollisionSystem from '../../assets/ts/systems/collision';
import Settings from '../../assets/ts/settings';
import { expect } from 'chai';

describe('CollisionSystem', () => {

    let settings: Settings;

    let system: CollisionSystem;

    let y1: number;

    let y2: number;

    let x: number;

    beforeEach(() => {

        settings = new Settings();

        system = new CollisionSystem(settings);

        y1 = y2 = x = 0;
    });

    describe('isBottomCollision()', () => {

        it('should return true when y1 equals y2', () => {

            y1 = 20;
            y2 = 20;
            x = 6;

            let isCollision = system.isBottomCollision(y1, y2, x);

            expect(isCollision).to.equal(true);
        });

        it('should return true when y1 equals y2 with x', () => {

            y1 = 20;
            y2 = 20;
            x = 6;

            let isCollision = system.isBottomCollision(y1, y2, x);

            expect(isCollision).to.equal(true);
        });

        it('should return true when y1 plus margin equals y2', () => {

            y1 = 14;
            y2 = 20;
            x = 6;

            let isCollision = system.isBottomCollision(y1, y2, x);

            expect(isCollision).to.equal(true);
        });

        it('should return true when y1 minus margin equals y2', () => {

            y1 = 26;
            y2 = 20;
            x = 6;

            let isCollision = system.isBottomCollision(y1, y2, x);

            expect(isCollision).to.equal(true);
        });
    });
});










