import ISystem from './isystem';
import Settings from '../settings';
import Node from '../nodes/node';
import Sprite from '../sprite';
import { ClassType } from '../enum'

export default class CollisionSystem implements ISystem {

    classType: ClassType;
    settings: Settings;

    constructor(settings: Settings) {

        this.classType = ClassType.COLLISION;
        this.settings = settings;
    }

    init() {

    }

    stop() {

    }

    isBroadcollision(sprite1: Sprite, sprite2: Sprite) {

        let approxY = false;

        let approxX = (Math.abs(sprite1.x - sprite2.x) < 50);

        if (approxX) {
            approxY = (Math.abs(sprite1.y - sprite2.y) < 50);
        }

        return approxX && approxY;
    }

    isNarrowCollision(sprite1: Sprite, sprite2: Sprite) {

        let isCollision = false;

        // console.log('sprite1.y', sprite1.y);
        // console.log('sprite2.y', sprite2.y);

        if (sprite1.x < sprite2.x + sprite2.width &&
           sprite1.x + sprite1.width > sprite2.x &&
           sprite1.y <= sprite2.y + sprite2.height &&
           sprite1.height + sprite1.y >= sprite2.y) {
            isCollision = true;
        }

        return isCollision;
    }

    isBottomCollision(y1, y2, margin) {

        let isCollision = y1 + margin >= y2 && y1 - margin <= y2;

        return isCollision;
    }

    isTopCollision(y1, y2, margin) {

        let isCollision = y2 > y1 && y2 < y1 + margin;

        return isCollision;
    }

    isRightCollision(x1, x2, margin) {

        let isCollision = x1 > x2 && x1 < x2 + margin;

        return isCollision;
    }

    isLeftCollision(x1, x2, margin) {

        let isCollision = x2 > x1 && x2 < x1 + margin;

        return isCollision;
    }

    handleObstacleCollision(primary: Node, secondary: Node) {

        let sprite1 = primary.display.sprite;
        let sprite2 = secondary.display.sprite;

        let errorMargin = this.settings.TILE/2;

        // let isBottomCollision = false;
        // let isTopCollision = false;
        // let isRightCollision = false;
        // let isLeftCollision = false;

        let result = 0; // 1111


        // if (this.isBottomCollision(sprite1.y + sprite1.height, sprite2.y, errorMargin)) {

        //     isBottomCollision = true;

        // } else if (this.isTopCollision(sprite1.y, sprite2.y + sprite2.height, errorMargin)) {

        //     isTopCollision = true;

        // } else if (this.isRightCollision(sprite1.x + sprite1.width, sprite2.x, errorMargin)) {

        //     isRightCollision = true;

        // } else if (this.isLeftCollision(sprite1.x, sprite2.x + sprite2.width, errorMargin)) {

        //     isLeftCollision = true;
        // }

        // console.log(isTopCollision + ', ' + isBottomCollision + ', ' + isLeftCollision + ', ' + isRightCollision);


        result = this.isBottomCollision(sprite1.y + sprite1.height, sprite2.y, errorMargin) ? result + 1 : result;

        result = this.isTopCollision(sprite1.y, sprite2.y + sprite2.height, errorMargin) ? result + 2 : result;

        result = this.isRightCollision(sprite1.x + sprite1.width, sprite2.x, errorMargin) ? result + 4 : result;

        result = this.isLeftCollision(sprite1.x, sprite2.x + sprite2.width, errorMargin) ? result + 8 : result;

        console.log(result);

        return {
            top: (result | 2) === 2,
            bottom: (result | 1) === 1,
            left: (result | 8) === 8,
            right: (result | 4) === 4
        };
    }

    handleTriggerCollision(primary: Node, secondary: Node) {

        secondary.collision.collide();
    }

    handlePrimaryDamageCollision(primary: Node, secondary: Node) {

    }

    handleSecondaryDamageCollision(primary: Node, secondary: Node) {

    }

    handleCollision(primary, secondary) {

        let sprite1 = primary.display.sprite;
        let sprite2 = secondary.display.sprite;

        let velocityData = primary.velocity;
        let collisionData = primary.collision;

        let triggerData = secondary.trigger;
        let inputData = primary.input;

        let primaryDamageData = primary.damage;
        let secondaryDamageData = secondary.damage;

        // handle different collision effects

        let results = null;

        if (velocityData && collisionData) {
            results = this.handleObstacleCollision(primary, secondary);
        }

        if (triggerData && inputData) {
            this.handleTriggerCollision(primary, secondary);
        }

        if (primaryDamageData) {
            // damage from player to secondary
            this.handleSecondaryDamageCollision(primary, secondary);
        }

        if (secondaryDamageData) {
            // damage to player from secondary
            this.handlePrimaryDamageCollision(primary, secondary);
        }

        return results;
    }

    update(time: number, nodes: Node[]) {



        let primaries = nodes.filter((node: Node) => {

            return node.collision.type === 'primary';
        });

        let secondaries = nodes.filter((node: Node) => {

            return node.collision.type !== 'primary';
        });

        primaries.map((primary: Node) => {

            let results = {
                top: false,
                bottom: false,
                left: false,
                right: false
            }

            secondaries.map((secondary: Node) => {


                let sprite1 = primary.display.sprite;
                let sprite2 = secondary.display.sprite;

                if (this.isBroadcollision(sprite1, sprite2)) {

                // console.log('------------');


                    // console.log('+');

                    if (this.isNarrowCollision(sprite1, sprite2)) {

                        console.log('+');

                        let collisionResults = this.handleCollision(primary, secondary);

                        // set collision position true
                        results.top = collisionResults.top || results.top;
                        results.bottom = collisionResults.bottom || results.bottom;
                        results.left = collisionResults.left || results.left;
                        results.right = collisionResults.right || results.right;

                        // console.log(results.top + ', ' + results.bottom + ', ' + results.left + ', ' + results.right);
                    }
                }
            });

            // console.log('results.bottom', results.bottom);

            primary.collision.isTopObstacleCollision = results.top;
            primary.collision.isBottomObstacleCollision = results.bottom;
            primary.collision.isLeftObstacleCollision = results.left;
            primary.collision.isRightObstacleCollision = results.right;

            primary.velocity.isGrounded = results.bottom;

            // console.log(results.top + ', ' + results.bottom + ', ' + results.left + ', ' + results.right);
        });


    }
}