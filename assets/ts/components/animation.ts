import IComponent from './icomponent';

class AnimationSet {

    default?: number[];
    right?: number[];
    left?: number[];
    jump?: number[];
}

export default class AnimationComponent implements IComponent {

    class: string;

    default: number[];
    right: number[];
    left: number[];
    jump: number[];
    currentAnimationProp: string;
    currentFrame: number;

    constructor(animations: AnimationSet) {

        this.class = 'animation';

        this.default = animations.default;

        this.right = animations.right;

        this.left = animations.left;

        this.jump = animations.jump;

        this.currentAnimationProp = 'default';

        this.currentFrame = 0;
    }

    destroy() {

        this.default = null;
        this.right = null;
        this.left = null;
        this.jump = null;
    }
}