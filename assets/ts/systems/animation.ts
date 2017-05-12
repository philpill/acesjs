import ISystem from './isystem';
import Settings from '../settings';
import Node from '../nodes/node';
import { ClassType } from '../enum'

export default class AnimationSystem implements ISystem {

    settings: Settings;
    timer: number;
    classType: ClassType;

    constructor(settings: Settings) {

        this.classType = ClassType.ANIMATION;
        this.settings = settings;
        this.timer = 0;
    }

    init() {

    }

    stop() {

    }

    setAnimation(node: Node, prop: string) {

        node.animation.currentAnimationProp = prop;
    }

    updateFrame(node: Node) {

        let animationData = node.animation;

        let displayData = node.display;

        let frames = animationData[animationData.currentAnimationProp];

        if (animationData.currentFrame + 1 >= frames.length) {

            animationData.currentFrame = 0;

        } else {

            animationData.currentFrame++;
        }

        displayData.sprite.texture.frame = displayData.sprite.data.texture[frames[animationData.currentFrame]];
    }

    update(dt: number, nodes: Node[]) {

        nodes.map((node: Node) => {

            let velocityData = node.velocity;

            let animationData = node.animation;

            if (velocityData.velocityY > 0.01 || velocityData.velocityY < -0.01) {

                // play jump animation
                this.setAnimation(node, 'jump');

            } else if (velocityData.velocityX > 0.1) {

                //play right animation
                this.setAnimation(node, 'right');

            } else if (velocityData.velocityX < -0.1) {

                //play left animation
                this.setAnimation(node, 'left');

            } else {

                this.setAnimation(node, 'default');
            }

            this.timer = this.timer + dt;

            if (this.timer > 0.2) {

                this.updateFrame(node);

                this.timer = dt;
            }

            return node;
        });
    }
}