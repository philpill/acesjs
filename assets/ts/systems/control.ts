import ISystem from './isystem';
import Settings from '../settings';
import INode from '../nodes/inode';
import ITypedNode from '../itypedNode';
import { ClassType } from '../enum'

export default class ControlSystem implements ISystem {

    classType: ClassType;
    class: string;
    settings: Settings;

    isJump: any;
    isLeft: any;
    isUp: any;
    isRight: any;
    isDown: any;

    constructor(settings: Settings) {

        this.classType = ClassType.CONTROL;
        this.class = 'control';
        this.settings = settings;
    }

    onKeyDown(e: KeyboardEvent) {

        let key = e.keyCode;

        this.isJump = this.isJump || key === this.settings.KEY.SPACE;
        this.isLeft = this.isLeft || key === this.settings.KEY.LEFT;
        this.isUp = this.isUp || key === this.settings.KEY.UP;
        this.isRight = this.isRight || key === this.settings.KEY.RIGHT;
        this.isDown = this.isDown || key === this.settings.KEY.DOWN;
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

    stop() {

    }

    update(time: number, nodes: ITypedNode[]) {

        nodes.map((node: ITypedNode) => {

            let velocityData = node.data.velocity;

            if (this.isUp && velocityData.isGrounded) {
                velocityData.accelerationY = -velocityData.maxAccelerationY;
            } else {
                velocityData.accelerationY = 1;
            }

            if (this.isRight) {
                // console.log('right');
                velocityData.accelerationX = velocityData.maxAccelerationX;
            } else if (this.isLeft) {
                // console.log('left');
                velocityData.accelerationX = -velocityData.maxAccelerationX;
            } else {
                velocityData.accelerationX = 0;
            }
        });
    }
}