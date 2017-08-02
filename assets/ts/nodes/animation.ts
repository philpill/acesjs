import Animation from '../components/animation';
import Display from '../components/display';
import Velocity from '../components/velocity';

export default class AnimationNode {

    entityId: number;
    animation: Animation;
    display: Display;
    velocity: Velocity;

    constructor (entityId: number, animationComponent: Animation, displayComponent: Display, velocityComponent: Velocity) {
        this.entityId = entityId;
        this.animation = animationComponent;
        this.display = displayComponent;
        this.velocity = velocityComponent;
    }
}