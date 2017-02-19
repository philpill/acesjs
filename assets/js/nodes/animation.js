export default class AnimationNode {

    constructor (entityId, animationComponent, displayComponent, velocityComponent) {
        this.entityId = entityId;
        this.animation = animationComponent;
        this.display = displayComponent;
        this.velocity = velocityComponent;
    }
}