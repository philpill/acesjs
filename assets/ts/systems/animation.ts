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

        animationData.currentFrame = animationData.currentFrame + 1 >= frames.length ? 0 : animationData.currentFrame + 1;

        displayData.sprite.texture.frame = displayData.sprite.data.texture[frames[animationData.currentFrame]];
    }

    getAnimation(velocityX: number, velocityY: number) {

        let animation = 'default';

        let isMidAir = velocityY > 0.01 || velocityY < -0.01;

        animation = isMidAir ? 'jump' : animation;

        animation = velocityX > 0.1 && !isMidAir ? 'right' : animation;

        animation = velocityX < -0.1 && !isMidAir ? 'left' : animation;

        return animation;
    }

    update(dt: number, nodes: Node[]) {

        nodes.map((node: Node) => {

            let velocityData = node.velocity;

            let animationData = node.animation;

            let animation = this.getAnimation(velocityData.velocityX, velocityData.velocityY);

            this.setAnimation(node, animation);

            this.timer = this.timer + dt;

            if (this.timer > 0.2) {

                this.updateFrame(node);

                this.timer = dt;
            }

            return node;
        });
    }
}