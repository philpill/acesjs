import INode from './inode';
import Input from '../components/input';
import Velocity from '../components/velocity';

export default class ControlNode implements INode {

    entityId: number;
    velocity: Velocity;
    input: Input;
    isActive: boolean;

    constructor (entityId: number, inputComponent: Input, velocityComponent: Velocity) {
        this.entityId = entityId;
        this.input = inputComponent;
        this.velocity = velocityComponent;
        this.isActive = true;
    }
}