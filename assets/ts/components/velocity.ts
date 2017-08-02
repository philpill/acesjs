import IComponent from './icomponent';

export default class VelocityComponent implements IComponent {

    class: string;
    accelerationX: number;
    accelerationY: number;

    maxAccelerationX: number;
    maxAccelerationY: number;

    velocityX: number;
    velocityY: number;

    constructor() {

        this.class = 'velocity';

        this.accelerationX = 0;
        this.accelerationY = 0;

        this.maxAccelerationX = 3;
        this.maxAccelerationY = 4;

        this.velocityX = 0;
        this.velocityY = 0;
    }
}