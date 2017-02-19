export default class AnimationComponent {

    constructor(data) {

        this.class = 'animation';

        this.default = [0];

        this.walkRight = [1, 2];

        this.walkLeft = [2, 1];

        this.jump = [3];

        this.currentAnimationProp = 'default';

        this.currentFrame = 0;
    }
}