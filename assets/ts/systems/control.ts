import ISystem from './isystem';
import Settings from '../settings';
import Node from '../nodes/node';
import { ClassType } from '../enum'

export default class ControlSystem implements ISystem {

    classType: ClassType;
    settings: Settings;

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

            let isJump = inputData.isUp &&  velocityData.isGrounded;


            if (isJump) {

                velocityData.accelerationY = -velocityData.maxAccelerationY;

            } else if (velocityData.isGrounded) {

                velocityData.accelerationY = 0;

                velocityData.velocityY = Math.min(0, velocityData.velocityY);
                velocityData.accelerationY = Math.min(0, velocityData.accelerationY);

            } else {

                velocityData.accelerationY = this.settings.GRAVITY;
            }

            velocityData.accelerationX = inputData.isRight || inputData.isLeft ? velocityData.accelerationX : 0;

            velocityData.accelerationX = inputData.isRight ? velocityData.maxAccelerationX : velocityData.accelerationX;

            velocityData.accelerationX = inputData.isLeft ? -velocityData.maxAccelerationX : velocityData.accelerationX;
        });
    }
}