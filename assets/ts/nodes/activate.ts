import INode from './inode';
import Position from '../components/position';
import Velocity from '../components/velocity';
import Collision from '../components/collision';

export default class ActivateNode implements INode {

    entityId: number;
    velocity: Velocity;
    position: Position;
    collision: Collision;
    isActive: boolean;

    constructor (entityId, positionComponent, velocityComponent, collisionComponent) {
        this.entityId = entityId;
        this.position = positionComponent;
        this.velocity = velocityComponent;
        this.collision = collisionComponent;
        this.isActive = true;
    }
}