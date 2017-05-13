import ISystem from './isystem';
import Settings from '../settings';
import Node from '../nodes/node';
import { ClassType } from '../enum'

export default class ControlSystem implements ISystem {

    classType: ClassType;
    settings: Settings;

    isJump: any;
    isLeft: any;
    isUp: any;
    isRight: any;
    isDown: any;

    constructor(settings: Settings) {

        this.classType = ClassType.CONTROL;
        this.settings = settings;
    }

    init() {

    }

    stop() {

    }

    update(time: number, nodes: Node[]) {

        nodes.map((node: Node) => {

            let velocityData = node.velocity;
            let inputData = node.input;

            if (inputData.isUp && velocityData.isGrounded) {
                velocityData.accelerationY = -velocityData.maxAccelerationY;
            } else {
                velocityData.accelerationY = this.settings.GRAVITY;
            }

            if (inputData.isRight) {
                // console.log('right');
                velocityData.accelerationX = velocityData.maxAccelerationX;
            } else if (inputData.isLeft) {
                // console.log('left');
                velocityData.accelerationX = -velocityData.maxAccelerationX;
            } else {
                velocityData.accelerationX = 0;
            }
        });
    }
}