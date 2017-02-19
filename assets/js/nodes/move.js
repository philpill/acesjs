export default class MoveNode {

    constructor (entityId, positionComponent, velocityComponent) {
        this.entityId = entityId;
        this.position = positionComponent;
        this.velocity = velocityComponent;
    }
}