import MoveNode from './nodes/move';
import RenderNode from './nodes/render';
import ControlNode from './nodes/control';
import ObstacleCollisionNode from './nodes/obstacleCollision';
import TriggerCollisionNode from './nodes/triggerCollision';
import AnimationNode from './nodes/animation';
import LevelNode from './nodes/level';
import Entity from './prefabs/entity';
import ISystem from './systems/isystem';
import INode from './nodes/inode';
import ITypedNode from './itypedNode';
import { ClassType } from './enum'

export default class Engine {

    entities: any[];
    systems: any[];
    nodes: any[];
    typedNodes: { [key: string] : ITypedNode[] };
    isPaused: boolean;

    constructor() {

        this.entities = [];
        this.systems = [];
        this.nodes = [];
        this.typedNodes = {};
        Object.keys(ClassType).map((classType) => {

            this.typedNodes[classType] = [];
        });

        this.isPaused = false;
    }

    init() {

        this.update();
    }

    addEntity(entity) {

        this.entities.push(entity);

        let entityComponents = entity.components;

        if (entityComponents.display && entityComponents.position) {

            // render
            let node = new RenderNode(entity.id, entityComponents.display, entityComponents.position);

            this.typedNodes[ClassType.RENDER].push({
                entityId: entity.id,
                class: 'render',
                classType: ClassType.RENDER,
                data: node,
                isActive: true });
        }

        if (entityComponents.animation && entityComponents.display && entityComponents.velocity) {

            let node = new AnimationNode(entity.id, entityComponents.animation, entityComponents.display, entityComponents.velocity);
            // animation
            this.typedNodes[ClassType.ANIMATION].push({
                entityId: entity.id,
                class: 'animation',
                classType: ClassType.ANIMATION,
                data: node,
                isActive: true });
        }

        if (entityComponents.velocity && entityComponents.position && entityComponents.collision) {

            let node = new MoveNode(entity.id, entityComponents.position, entityComponents.velocity, entityComponents.collision);
            // move
            this.typedNodes[ClassType.MOVE].push({
                entityId: entity.id,
                class: 'move',
                classType: ClassType.MOVE,
                data: node,
                isActive: true });
        }

        if (entityComponents.velocity && entityComponents.input) {

            let node = new ControlNode(entity.id, entityComponents.control, entityComponents.velocity);
            // control
            this.typedNodes[ClassType.CONTROL].push({
                entityId: entity.id,
                class: 'control',
                classType: ClassType.CONTROL,
                data: node,
                isActive: true });
        }

        if (entityComponents.collision && entityComponents.display) {

            let node = new ObstacleCollisionNode(entity.id, entityComponents.collision, entityComponents.display, entityComponents.velocity);
            // collision
            this.typedNodes[ClassType.OBSTACLE_COLLISION].push({
                entityId: entity.id,
                class: 'obstacleCollision',
                classType: ClassType.OBSTACLE_COLLISION,
                data: node,
                isActive: true });
        }

        if (entityComponents.collision && entityComponents.display && entityComponents.trigger) {

            let node = new TriggerCollisionNode(entity.id, entityComponents.collision, entityComponents.display, entityComponents.velocity);
            // collision
            this.typedNodes[ClassType.TRIGGER_COLLISION].push({
                entityId: entity.id,
                class: 'triggerCollision',
                classType: ClassType.TRIGGER_COLLISION,
                data: node,
                isActive: true });
        }


        if (entityComponents.position && entityComponents.input) { // need a second 'trigger' component or this will apply to all rendered objects

            let node = new LevelNode(entity.id, entityComponents.position);
            // level
            this.typedNodes[ClassType.LEVEL].push({
                entityId: entity.id,
                class: 'level',
                classType: ClassType.LEVEL,
                data: node,
                isActive: true });
        }

        return entity;
    }

    addEntities(entities: Entity[]) {
        if (entities && entities.length) {
            entities.map(this.addEntity.bind(this));
        }
    }

    removeEntity(entity: Entity) {
        let entityId = entity.id;
        this.entities = this.entities.filter((entity) => {
            return entity.id !== entityId;
        });
    }

    removeEntityById(entityId: string) {
        let entities = this.getEntitiesById(entityId);
        return entities.map(this.removeEntity.bind(this));
    }

    removeEntitiesById(ids: string[]) {
        return ids.map(this.removeEntityById.bind(this));
    }

    addSystem(system: ISystem) {
        this.systems.push(system);
        system.init();
    }

    removeSystem(system: ISystem) {
        system.stop();
        system = null;
        this.systems = this.systems.filter((system: ISystem) => {
            return !!system;
        });
    }

    getEntitiesById(entityId: string) {
        return this.entities.filter((entity: Entity) => {
            return entity.id === entityId;
        });
    }

    update(before = 0) {

        this.isPaused = false;

        if (document.visibilityState !== 'visible') {

            this.isPaused = true;
        }

        let now = performance.now();

        let dt = (now - before)/1000;

        dt = Math.min(dt, 0.1); // magic number to prevent massive dt when tab not active

        if (!this.isPaused) {

            let nodes = Object.keys(ClassType).map((classType) => {
                return this.typedNodes[classType];
            });



            [].concat.apply([], nodes).filter((node) => {
                return !node.isActive;
            }).map((node) => {
                return node.entityId;
            }).filter((value, index, array) => {
                return array.indexOf(value) === index;
            }).map((id) => {
                return this.getEntitiesById(id);
            }).map((entity) => {
                return entity.destroy();
            });

            let results = [];

            this.systems.map((system) => {
                results.push(system.update(dt, this.typedNodes[system.classType] || []));
            });

            results = results.filter((result) => { return result; });

            let newEntities = results.map((result) => {
                return result.newEntities;
            })[0];

            let deadEntities = results.map((result) => {
                return result.deadEntities;
            });

            this.addEntities(newEntities);
        }

        before = now;

        requestAnimationFrame(this.update.bind(this, before));
    }
}
