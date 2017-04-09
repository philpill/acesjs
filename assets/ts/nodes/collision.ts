import INode from './inode';
import Display from '../components/display';
import Velocity from '../components/velocity';
import Collision from '../components/collision';

export default class CollisionNode implements INode {

    entityId: number;
    display: Display;
    velocity: Velocity;
    collision: Collision;

    isActive: boolean;

    constructor (entityId: number, collisionComponent: Collision, displayComponent: Display, velocityComponent: Velocity) {
        this.entityId = entityId;
        this.collision = collisionComponent;
        this.display = displayComponent;
        this.velocity = velocityComponent;
        this.isActive = true;
    }
}