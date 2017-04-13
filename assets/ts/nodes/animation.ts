import INode from './inode';
import Animation from '../components/animation';
import Display from '../components/display';
import Velocity from '../components/velocity';

export default class AnimationNode implements INode {

    entityId: number;
    animation: Animation;
    display: Display;
    velocity: Velocity;
    isActive: boolean;

    constructor (entityId: number, animationComponent: Animation, displayComponent: Display, velocityComponent: Velocity) {
        this.entityId = entityId;
        this.animation = animationComponent;
        this.display = displayComponent;
        this.velocity = velocityComponent;
        this.isActive = true;
    }
}