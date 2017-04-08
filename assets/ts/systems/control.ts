import ISystem from './isystem';
import Settings from '../settings';
import INode from '../nodes/inode';

export default class ControlSystem implements ISystem {

    class: string;
    settings: Settings;

    isJump: any;
    isLeft: any;
    isUp: any;
    isRight: any;
    isDown: any;

    constructor(settings: Settings) {

        this.class = 'control';
        this.settings = settings;
    }

    onKeyDown(e: KeyboardEvent) {

        let key = e.keyCode;

        this.isJump = this.isJump | key === this.settings.KEY.SPACE;
        this.isLeft = this.isLeft | key === this.settings.KEY.LEFT;
        this.isUp = this.isUp | key === this.settings.KEY.UP;
        this.isRight = this.isRight | key === this.settings.KEY.RIGHT;
        this.isDown = this.isDown | key === this.settings.KEY.DOWN;
    }

    onKeyUp(e: KeyboardEvent) {

        let key = e.keyCode;

        this.isJump = key === this.settings.KEY.SPACE ? false : this.isJump;
        this.isLeft = key === this.settings.KEY.LEFT ? false : this.isLeft;
        this.isUp = key === this.settings.KEY.UP ? false : this.isUp;
        this.isRight = key === this.settings.KEY.RIGHT ? false : this.isRight;
        this.isDown = key === this.settings.KEY.DOWN ? false : this.isDown;

        if (key === this.settings.KEY.P) {
            // this.isPause = !this.isPause;
        }
    }

    bind() {
        window.addEventListener('keydown', this.onKeyDown.bind(this), false);
        window.addEventListener('keyup', this.onKeyUp.bind(this), false);
    }

    unbind() {
        window.removeEventListener('keydown', this.onKeyDown.bind(this), false);
        window.removeEventListener('keyup', this.onKeyUp.bind(this), false);
    }

    init() {
        this.bind();
    }

    update(time: number, nodes: INode[]) {

        for (let i = 0, j = nodes.length; i < j; i++) {

            if (this.isUp && nodes[i].data.velocity.isGrounded) {
                console.log('JUMP');
                nodes[i].data.velocity.accelerationY = -nodes[i].data.velocity.maxAccelerationY;
                nodes[i].data.velocity.velocityY = -0.3;
            } else {
                nodes[i].data.velocity.accelerationY = 1;
            }

            if (this.isRight) {
                // console.log('right');
                nodes[i].data.velocity.accelerationX = nodes[i].data.velocity.maxAccelerationX;
            } else if (this.isLeft) {
                // console.log('left');
                nodes[i].data.velocity.accelerationX = -nodes[i].data.velocity.maxAccelerationX;
            } else {
                nodes[i].data.velocity.accelerationX = 0;
            }
        }
    }
}