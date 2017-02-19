export default class CollisionNode {

    constructor (entityId, collisionComponent, displayComponent, velocityComponent) {
        this.entityId = entityId;
        this.collision = collisionComponent;
        this.display = displayComponent;
        this.velocity = velocityComponent;
    }
}