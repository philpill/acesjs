export default class ControlNode {

    constructor (entityId, inputComponent, velocityComponent) {
        this.entityId = entityId;
        this.input = inputComponent;
        this.velocity = velocityComponent;
    }
}