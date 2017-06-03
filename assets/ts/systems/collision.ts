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

        let approxX = (Math.abs(sprite1.x - sprite2.x) < 100);

        if (approxX) {
            approxY = (Math.abs(sprite1.y - sprite2.y) < 100);
        }

        return approxX && approxY;
    }

    isNarrowCollision(sprite1: Sprite, sprite2: Sprite) {

        let isCollision = false;

        if (sprite1.x < sprite2.x + sprite2.width &&
           sprite1.x + sprite1.width > sprite2.x &&
           sprite1.y < sprite2.y + sprite2.height &&
           sprite1.height + sprite1.y > sprite2.y) {
            isCollision = true;
        }

        return isCollision;
    }

    handleObstacleCollision(primary: Node, secondary: Node) {

        let sprite1 = primary.display.sprite;
        let sprite2 = secondary.display.sprite;

        let velocityData = primary.velocity;
        let collisionData = primary.collision;

        let errorMargin = this.settings.TILE/2;

        let isBottomCollision = sprite1.y + sprite1.height > sprite2.y &&
            sprite1.height + sprite1.y < sprite2.y + errorMargin;

        let isTopCollision = sprite2.y + sprite2.height > sprite1.y &&
            sprite2.height + sprite2.y < sprite1.y + errorMargin;

        let isRightCollision = sprite1.x + sprite1.width > sprite2.x &&
            sprite1.x + sprite1.width < sprite2.x + errorMargin;

        let isLeftCollision = sprite2.x + sprite2.width > sprite1.x &&
            sprite2.x + sprite2.width < sprite1.x + errorMargin;

        // collisionData.isTopObstacleCollision = isTopCollision;
        // collisionData.isBottomObstacleCollision = isBottomCollision;
        // collisionData.isLeftObstacleCollision = isLeftCollision;
        // collisionData.isRightObstacleCollision = isRightCollision;

        // SHIFT ALL THIS INTO MOVE SYSTEM

        // check collision
        if (isBottomCollision) {

            velocityData.velocityY = Math.min(0, velocityData.velocityY);
            velocityData.isGrounded = true;

        } else if (isTopCollision) {

            velocityData.velocityY = Math.max(0, velocityData.velocityY);

        } else if (isRightCollision) {

            velocityData.accelerationX = Math.min(0, velocityData.accelerationX);
            velocityData.velocityX = Math.min(0, velocityData.velocityX);

        } else if (isLeftCollision) {

            velocityData.accelerationX = Math.max(0, velocityData.accelerationX);
            velocityData.velocityX = Math.max(0, velocityData.velocityX);
        }

        return {
            top: isTopCollision,
            bottom: isBottomCollision,
            left: isLeftCollision,
            right: isRightCollision
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

                if (this.isBroadcollision(sprite1, sprite2) && this.isNarrowCollision(sprite1, sprite2)) {

                    let collisionResults = this.handleCollision(primary, secondary);

                    // set collision position true
                    results.top = collisionResults.top || results.top;
                    results.bottom = collisionResults.bottom || results.bottom;
                    results.left = collisionResults.left || results.left;
                    results.right = collisionResults.right || results.right;
                }
            });

            primary.collision.isTopObstacleCollision = results.top;
            primary.collision.isBottomObstacleCollision = results.bottom;
            primary.collision.isLeftObstacleCollision = results.left;
            primary.collision.isRightObstacleCollision = results.right;

            primary.velocity.isGrounded = results.bottom;
        });
    }
}