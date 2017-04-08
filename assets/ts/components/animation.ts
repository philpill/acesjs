import IComponent from './icomponent';

export default class AnimationComponent implements IComponent {

    class: string;
    default: number[];
    walkRight: number[];
    walkLeft: number[];
    jump: number[];
    currentAnimationProp: string;
    currentFrame: number;

    constructor() {

        this.class = 'animation';

        this.default = [0];

        this.walkRight = [1, 2];

        this.walkLeft = [2, 1];

        this.jump = [3];

        this.currentAnimationProp = 'default';

        this.currentFrame = 0;
    }
}