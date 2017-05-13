import ISystem from './isystem';
import Settings from '../settings';
import Node from '../nodes/node';
import Sprite from '../sprite';
import { ClassType } from '../enum'

export default class ObstacleCollisionSystem implements ISystem {

    classType: ClassType;
    settings: Settings;

    constructor(settings: Settings) {

        this.classType = ClassType.OBSTACLE_COLLISION;
        this.settings = settings;
    }

    init() {

    }

    stop() {

    }

    isBroadcollision(sprite1: Sprite, sprite2: Sprite) {

        let isBroadCollision = false;

        let approxY = false;

        let approxX = (Math.abs(sprite1.x - sprite2.x ) < 100);

        if (approxX) {
            approxY = (Math.abs(sprite1.y - sprite2.y ) < 100);
        }

        isBroadCollision = approxX && approxY;

        return isBroadCollision;
    }

    isCollision(sprite1: Sprite, sprite2: Sprite) {

        let isCollision = false;

        if (sprite1.x < sprite2.x + sprite2.width &&
           sprite1.x + sprite1.width > sprite2.x &&
           sprite1.y < sprite2.y + sprite2.height &&
           sprite1.height + sprite1.y > sprite2.y) {
            isCollision = true;
        }

        return isCollision;
    }

    update(time: number, nodes: Node[]) {

        let primaries = nodes.filter((node: Node) => {

            return node.collision.type === 'primary';
        });

        let secondaries = nodes.filter((node: Node) => {

            return node.collision.type !== 'primary';
        });

        primaries.map((primary: Node) => {

            primary.velocity.isGrounded = false;
            primary.collision.isBottomObstacleCollision = false;

            secondaries.map((secondary: Node) => {

                let sprite1 = primary.display.sprite;

                let sprite2 = secondary.display.sprite;

                if (this.isBroadcollision(sprite1, sprite2)) {

                    if (this.isCollision(sprite1, sprite2)) {

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

                        collisionData.isTopObstacleCollision = isTopCollision;
                        collisionData.isBottomObstacleCollision = isBottomCollision;
                        collisionData.isLeftObstacleCollision = isLeftCollision;
                        collisionData.isRightObstacleCollision = isRightCollision;

                        // SHIFT ALL THIS INTO MOVE SYSTEM

                        // check collision
                        if (isBottomCollision) {

                            // velocityData.accelerationY = Math.min(0, velocityData.accelerationY);
                            velocityData.velocityY = Math.min(0, velocityData.velocityY);
                            velocityData.isGrounded = true;

                        } else if (isTopCollision) {

                            // velocityData.accelerationY = Math.max(0, velocityData.accelerationY);
                            velocityData.velocityY = Math.max(0, velocityData.velocityY);

                        } else if (isRightCollision) {

                            velocityData.accelerationX = Math.min(0, velocityData.accelerationX);
                            velocityData.velocityX = Math.min(0, velocityData.velocityX);

                        } else if (isLeftCollision) {

                            velocityData.accelerationX = Math.max(0, velocityData.accelerationX);
                            velocityData.velocityX = Math.max(0, velocityData.velocityX);
                        }

                        primary.collision.collide(secondary);
                    }
                }
            });
        });
    }
}