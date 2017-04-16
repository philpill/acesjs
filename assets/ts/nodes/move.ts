import INode from './inode';
import Position from '../components/position';
import Velocity from '../components/velocity';

export default class MoveNode implements INode {

    entityId: number;
    velocity: Velocity;
    position: Position;
    isActive: boolean;

    constructor (entityId, positionComponent, velocityComponent) {
        this.entityId = entityId;
        this.position = positionComponent;
        this.velocity = velocityComponent;
        this.isActive = true;
    }
}