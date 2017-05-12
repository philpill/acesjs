import ISystem from './isystem';
import Settings from '../settings';
import Node from '../nodes/node';
import Sprite from '../sprite';
import { ClassType } from '../enum'

export default class TriggerCollisionSystem implements ISystem {

    classType: ClassType;
    settings: Settings;

    constructor(settings: Settings) {

        this.classType = ClassType.TRIGGER_COLLISION;
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

    update(time: number, nodes: Node[]) {

        let primaries = nodes.filter((node: Node) => {

            return node.collision.type === 'primary';
        });

        let secondaries = nodes.filter((node: Node) => {

            return node.collision.type !== 'primary';
        });

        primaries.map((primary: Node) => {

            primary.velocity.isGrounded = false;

            secondaries.map((secondary: Node) => {

                let sprite1 = primary.display.sprite;

                let sprite2 = secondary.display.sprite;

                if (this.isCollision(sprite1, sprite2)) {


                }
            });
        });
    }
}