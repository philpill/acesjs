import Position from '../components/position';
import Velocity from '../components/velocity';

export default class MoveNode {

    entityId: number;
    velocity: Velocity;
    position: Position;

    constructor (entityId, positionComponent, velocityComponent) {
        this.entityId = entityId;
        this.position = positionComponent;
        this.velocity = velocityComponent;
    }
}