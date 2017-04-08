import ISystem from './isystem';
import Settings from '../settings';
import INode from '../nodes/inode';

export default class CollisionSystem implements ISystem {

    class: string;
    settings: Settings;

    constructor(settings: Settings) {

        this.class = 'collision';
        this.settings = settings;
    }

    init() {

    }

    isCollision(sprite1, sprite2) {

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

            return node.data.collision.type === 'primary';
        });

        let secondaries = nodes.filter((node: INode) => {

            return node.data.collision.type !== 'primary';
        });

        primaries.map((primary: INode) => {

            primary.data.velocity.isGrounded = false;

            secondaries.map((secondary) => {

                let sprite1 = primary.data.display.sprite;

                let sprite2 = secondary.data.display.sprite;

                if (this.isCollision(sprite1, sprite2)) {

                    let velocityData = primary.data.velocity;

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

                    primary.data.collision.collide(secondary);
                }
            });
        });
    }
}