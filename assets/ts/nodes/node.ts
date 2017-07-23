import Animation from '../components/animation';
import Collision from '../components/collision';
import Damage from '../components/damage';
import Display from '../components/display';
import Health from '../components/health';
import Input from '../components/input';
import Position from '../components/position';
import Trigger from '../components/trigger';
import User from '../components/user';
import Velocity from '../components/velocity';
import { ClassType } from '../enum';

export class NodeComponents {

    animation?: Animation;
    collision?: Collision;
    damage?: Damage;
    display?: Display;
    health?: Health;
    input?: Input;
    position?: Position;
    trigger?: Trigger;
    user?: User;
    velocity?: Velocity;
}

export default class Node {

    entityId: string;

    classType: ClassType;

    animation?: Animation;
    collision?: Collision;
    damage?: Damage;
    display?: Display;
    health?: Health;
    input?: Input;
    position?: Position;
    trigger?: Trigger;
    user?: User;
    velocity?: Velocity;

    isActive: boolean;

    constructor (entityId: string, classType: ClassType, components: NodeComponents) {

        this.entityId = entityId;
        this.classType = classType;

        this.animation = components.animation;
        this.collision = components.collision;
        this.damage = components.damage;
        this.display = components.display;
        this.health = components.health;
        this.input = components.input;
        this.position = components.position;
        this.trigger = components.trigger;
        this.user = components.user;
        this.velocity = components.velocity;

        this.isActive = true;
    }

    destroy() {
        this.classType = null;

        this.animation = null;
        this.collision = null;
        this.damage = null;
        this.display = null;
        this.health = null;
        this.input = null;
        this.position = null;
        this.trigger = null;
        this.user = null;
        this.velocity = null;

        this.isActive = false;
    }
}