import ISystem from './isystem';
import Settings from '../settings';
import INode from '../nodes/inode';

export default class AnimationSystem implements ISystem {

    class: string;
    settings: Settings;
    timer: number;

    constructor(settings: Settings) {

        this.class = 'animation';
        this.settings = settings;
        this.timer = 0;
    }

    init() {

    }

    stop() {

    }

    setAnimation(node: INode, prop: string) {

        node.animation.currentAnimationProp = prop;
    }

    updateFrame(node: INode) {

        let animationData = node.animation;

        let displayData = node.display;

        let frames = animationData[node.animation.currentAnimationProp];

        if (animationData.currentFrame + 1 >= frames.length) {

            animationData.currentFrame = 0;

        } else {

            animationData.currentFrame++;
        }

        displayData.sprite.texture.frame = displayData.sprite.data.texture[frames[animationData.currentFrame]];
    }

    update(dt: number, nodes: INode[]) {

        nodes.map((node: INode) => {

            let velocityData = node.velocity;

            let animationData = node.animation;

            if (velocityData.velocityY > 0.01 || velocityData.velocityY < -0.01) {

                // play jump animation
                this.setAnimation(node, 'jump');

            } else if (velocityData.velocityX > 0.1) {

                //play right animation
                this.setAnimation(node, 'walkRight');

            } else if (velocityData.velocityX < -0.1) {

                //play left animation
                this.setAnimation(node, 'walkLeft');

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