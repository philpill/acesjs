export default class RenderNode {

    constructor (entityId, displayComponent, positionComponent) {
        this.entityId = entityId;
        this.display = displayComponent;
        this.position = positionComponent;
    }
}