import IComponent from './icomponent';
import Settings from '../settings';

export default class VelocityComponent implements IComponent {

    class: string;

    accelerationX: number;
    accelerationY: number;

    maxAccelerationX: number;
    maxAccelerationY: number;

    velocityX: number;
    velocityY: number;

    isGrounded: boolean;

    constructor(settings: Settings) {

        this.class = 'velocity';

        this.accelerationX = 0;
        this.accelerationY = settings.GRAVITY;

        this.maxAccelerationX = 3;
        this.maxAccelerationY = 7;

        this.velocityX = 0;
        this.velocityY = 0;

        this.isGrounded = false;
    }

    destroy() {

    }
}