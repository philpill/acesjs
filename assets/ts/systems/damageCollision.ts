import ISystem from './isystem';
import Settings from '../settings';
import INode from '../nodes/inode';
import Sprite from '../sprite';
import ITypedNode from '../itypedNode';

export default class DamageCollisionSystem implements ISystem {

    class: string;
    settings: Settings;

    constructor(settings: Settings) {

        this.class = 'damageCollision';
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

    update(time: number, nodes: ITypedNode[]) {

        let primaries = nodes.filter((node: ITypedNode) => {

            return node.data.collision.type === 'primary';
        });

        let secondaries = nodes.filter((node: ITypedNode) => {

            return node.data.collision.type !== 'primary';
        });

        primaries.map((primary: ITypedNode) => {

            primary.data.velocity.isGrounded = false;

            secondaries.map((secondary: ITypedNode) => {

                let sprite1 = primary.data.display.sprite;

                let sprite2 = secondary.data.display.sprite;

                if (this.isCollision(sprite1, sprite2)) {

                }
            });
        });
    }
}