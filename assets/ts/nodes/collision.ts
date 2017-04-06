import Display from '../components/display';
import Velocity from '../components/velocity';
import Collision from '../components/collision';

export default class CollisionNode {

    entityId: number;
    display: Display;
    velocity: Velocity;
    collision: Collision;

    constructor (entityId: number, collisionComponent: Collision, displayComponent: Display, velocityComponent: Velocity) {
        this.entityId = entityId;
        this.collision = collisionComponent;
        this.display = displayComponent;
        this.velocity = velocityComponent;
    }
}