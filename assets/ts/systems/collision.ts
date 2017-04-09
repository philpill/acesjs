import ISystem from './isystem';
import Settings from '../settings';
import INode from '../nodes/inode';
import Sprite from '../sprite';

export default class CollisionSystem implements ISystem {

    class: string;
    settings: Settings;

    constructor(settings: Settings) {

        this.class = 'collision';
        this.settings = settings;
    }

    init() {

    }

    stop() {

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

    update(time: number, nodes: INode[]) {

        let primaries = nodes.filter((node: INode) => {

            return node.collision.type === 'primary';
        });

        let secondaries = nodes.filter((node: INode) => {

            return node.collision.type !== 'primary';
        });

        primaries.map((primary: INode) => {

            primary.velocity.isGrounded = false;

            secondaries.map((secondary) => {

                let sprite1 = primary.display.sprite;

                let sprite2 = secondary.display.sprite;

                if (this.isCollision(sprite1, sprite2)) {

                    let velocityData = primary.velocity;

                    let errorMargin = this.settings.TILE/2;

                    let isBottomCollision = sprite1.y + sprite1.height > sprite2.y &&
                        sprite1.height + sprite1.y < sprite2.y + errorMargin;

                    let isTopCollision = sprite2.y + sprite2.height > sprite1.y &&
                        sprite2.height + sprite2.y < sprite1.y + errorMargin;

                    let isRightCollision = sprite1.x + sprite1.width > sprite2.x &&
                        sprite1.x + sprite1.width < sprite2.x + errorMargin;

                    let isLeftCollision = sprite2.x + sprite2.width > sprite1.x &&
                        sprite2.x + sprite2.width < sprite1.x + errorMargin;

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
            });
        });
    }
}