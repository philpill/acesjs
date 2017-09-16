import ISystem from './isystem';
import Settings from '../settings';
import Node from '../nodes/node';
import Sprite from '../sprite';
import PositionComponent from '../components/position';
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

    isBroadcollision(x1: number, y1: number, x2: number, y2: number) {

        let approxY = false;

        let approxX = (Math.abs(x1 - x2) < 50);

        if (approxX) {
            approxY = (Math.abs(y1 - y2) < 50);
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

        let errorMargin = this.settings.TILE / 2;


        let isTop = false;
        let isRight = false;
        let isBottom = false;
        let isLeft = false;

        if (this.isBottomCollision(sprite1.y + sprite1.height, sprite2.y, errorMargin)) {

            isBottom = true;

        } else if (this.isRightCollision(sprite1.x + sprite1.width, sprite2.x, errorMargin)) {

            isRight = true;

        } else if (this.isLeftCollision(sprite1.x, sprite2.x + sprite2.width, errorMargin)) {

            isLeft = true;

        } else if (this.isTopCollision(sprite1.y, sprite2.y + sprite2.height, errorMargin)) {

            isTop = true;
        }

        return {
            top: isTop,
            bottom: isBottom,
            left: isLeft,
            right: isRight
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

    getBroadFieldCollisionNodes(primarySprite: Sprite, secondaries: Node[]) {

        let broadSecondaries = secondaries.filter((secondary: Node) => {

            return this.isBroadcollision(primarySprite.x, primarySprite.y, secondary.display.sprite.x, secondary.display.sprite.y);
        });

        return broadSecondaries;
    }

    getNarrowFieldCollisionNodes(primarySprite: Sprite, secondaries: Node[]) {

        let narrowSecondaries = secondaries.filter((secondary: Node) => {

            return this.isNarrowCollision(primarySprite, secondary.display.sprite);
        });

        return narrowSecondaries;
    }

    getMovingNodes(nodes: Node[]) {

        let movingNodes = nodes.filter((node: Node) => {

            return node.position.expectedX || node.position.expectedY;
        });

        return movingNodes;
    }

    getSweepingVolume(node: Node) {

        let position = node.position;
        let display = node.display;

        return {
            x1: position.x,
            y1: position.y,
            x2: position.expectedX + display.sprite.width,
            y2: position.expectedY + display.sprite.height
        };
    }

    getBroadCollisions(bounds, nodes: Node[]) {

        // console.log(bounds);

        let collisions = nodes.filter((node: Node) => {

            // console.log(node);

            let xCollision = node.position.x >= bounds.x1 && node.position.x <= bounds.x2;

            let yCollision = node.position.y >= bounds.y1 && node.position.y <= bounds.y2;

            return xCollision && yCollision;
        });

        // console.log(collisions);

        return collisions;
    }

    resolveCollision(nodes: Node[]) {

        let position = nodes.reduce((previous: any, node: Node) => {

            // console.log(node.position);

            // this depends on vector
            previous.x = node.position.x < previous.x ? node.position.x : previous.x;
            previous.y = node.position.y < previous.y ? node.position.y : previous.y;

            return previous;

        }, { x: 999999, y: 999999 });

        return position;
    }

    update(time: number, nodes: Node[]) {
        /*
                let primaries = nodes.filter((node: Node) => {

                    return node.collision.type === 'primary';
                });

                let secondaries = nodes.filter((node: Node) => {

                    return node.collision.type !== 'primary';
                });
        */


        // get all nodes which have a proposed x/y
        let things = this.getMovingNodes(nodes);

        // console.log(things);

        things.map((node: Node) => {

            // console.log(node);

            let finalPosition = {
                x: node.position.expectedX,
                y: node.position.expectedY
            }

            let sweep = this.getSweepingVolume(node);

            let otherNodes = nodes.filter((otherNode: Node) => {

                return otherNode.entityId !== node.entityId;
            });

            let broadCollisions = this.getBroadCollisions(sweep, otherNodes);

            if (broadCollisions.length) {

                // console.log('collision ', broadCollisions.length);

                // console.log('collision ', broadCollisions);

                // resolve collisions, penetration resolution, bullet through paper
                let collisionPosition = this.resolveCollision(broadCollisions);

                // let things = this.resolveCollision(broadCollisions);

                // console.log('collision result ', things);

                // if horizontal velocity positive add width
                finalPosition.x = node.velocity.velocityX > 0 ? collisionPosition.x - node.display.sprite.width : collisionPosition.x;
                // if vertical velocity positive, remove height
                finalPosition.y = node.velocity.velocityY > 0 ? collisionPosition.y - node.display.sprite.height : collisionPosition.y;

                // node.velocity.velocityX = 0;
                // node.velocity.velocityY = 0;
            }

            // set x/y = proposed x/y
            node.position.x = finalPosition.x;
            node.position.y = finalPosition.y;

            // clear proposed x/y
            node.position.expectedX = null;
            node.position.expectedY = null;
        });


        /*

                primaries.map((primary: Node) => {

                    let results = {
                        top: false,
                        bottom: false,
                        left: false,
                        right: false
                    }

                    let primarySprite = primary.display.sprite;

                    let broadSecondaries = this.getBroadFieldCollisionNodes(primarySprite, secondaries);

                    let narrowSecondaries = this.getNarrowFieldCollisionNodes(primarySprite, broadSecondaries);

                    narrowSecondaries.reduce((results, secondary: Node) => {

                        let sprite2 = secondary.display.sprite;

                        let collisionResults = this.handleCollision(primary, secondary);

                        // set collision position true
                        results.top = collisionResults.top || results.top;
                        results.bottom = collisionResults.bottom || results.bottom;
                        results.left = collisionResults.left || results.left;
                        results.right = collisionResults.right || results.right;

                        return results;

                    }, results);

                    primary.collision.isTopObstacleCollision = results.top;
                    primary.collision.isBottomObstacleCollision = results.bottom;
                    primary.collision.isLeftObstacleCollision = results.left;
                    primary.collision.isRightObstacleCollision = results.right;

                    primary.velocity.isGrounded = results.bottom;

                    // console.log(results.top + ', ' + results.right + ', ' + results.bottom + ', ' + results.left);
                });

                */
    }
}