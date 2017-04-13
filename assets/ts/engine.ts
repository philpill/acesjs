import MoveNode from './nodes/move';
import RenderNode from './nodes/render';
import ControlNode from './nodes/control';
import CollisionNode from './nodes/collision';
import AnimationNode from './nodes/animation';
import LevelNode from './nodes/level';
import Entity from './prefabs/entity';
import ISystem from './systems/isystem';
import INode from './nodes/inode';
import ITypedNode from './itypedNode';

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
        this.isPaused = false;
    }

    init() {

        this.update();
    }

    addEntity(entity) {

        this.entities.push(entity);

        if (entity.components.display && entity.components.position) {

            // render
            this.typedNodes['render'] = this.typedNodes['render'] || [];

            this.typedNodes['render'].push({ entityId: entity.id, class: 'render', data: new RenderNode(entity.id, entity.components.display, entity.components.position), isActive: true });
        }

        if (entity.components.animation && entity.components.display && entity.components.velocity) {

            this.typedNodes['animation'] = this.typedNodes['animation'] || [];

            // animation
            this.typedNodes['animation'].push({
                entityId: entity.id,
                class: 'animation',
                data: new AnimationNode(entity.id, entity.components.animation, entity.components.display, entity.components.velocity),
                isActive: true });
        }

        if (entity.components.velocity && entity.components.position) {

            this.typedNodes['move'] = this.typedNodes['move'] || [];

            // move
            this.typedNodes['move'].push({ entityId: entity.id, class: 'move', data: new MoveNode(entity.id, entity.components.position, entity.components.velocity), isActive: true });
        }

        if (entity.components.velocity && entity.components.input) {

            this.typedNodes['control'] = this.typedNodes['control'] || [];

            // control
            this.typedNodes['control'].push({ entityId: entity.id, class: 'control', data: new ControlNode(entity.id, entity.components.control, entity.components.velocity), isActive: true });
        }

        if (entity.components.collision) {

            this.typedNodes['collision'] = this.typedNodes['collision'] || [];

            // collision
            this.typedNodes['collision'].push({ entityId: entity.id, class: 'collision', data: new CollisionNode(entity.id, entity.components.collision, entity.components.display, entity.components.velocity), isActive: true });
        }

        if (entity.components.position) { // need a second 'trigger' component or this will apply to all rendered objects

            this.typedNodes['level'] = this.typedNodes['level'] || [];

            // level
            this.typedNodes['level'].push({ entityId: entity.id, class: 'level', data: new LevelNode(entity.id, entity.components.position), isActive: true });
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

            let nodes = Object.keys(this.typedNodes).map((type) => {
                return this.typedNodes[type];
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
                results.push(system.update(dt, this.typedNodes[system.class] || []));
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
