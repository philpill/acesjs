import MoveNode from './nodes/move';
import RenderNode from './nodes/render';
import ControlNode from './nodes/control';
import CollisionNode from './nodes/collision';
import AnimationNode from './nodes/animation';
import LevelNode from './nodes/level';

export default class Engine {

    constructor() {

        this.entities = [];
        this.systems = [];
        this.nodes = [];
        this.isPaused = false;
    }

    init() {

        this.update();
    }

    addEntity(entity) {

        this.entities.push(entity);

        if (entity.components.display && entity.components.position) {

            this.nodes.push({ entityId: entity.id, class: 'render', data: new RenderNode(entity.id, entity.components.display, entity.components.position), isActive: true });
        }

        if (entity.components.animation && entity.components.display && entity.components.velocity) {

            this.nodes.push({ entityId: entity.id, class: 'animation', data: new AnimationNode(entity.id, entity.components.animation, entity.components.display, entity.components.velocity), isActive: true });
        }

        if (entity.components.velocity && entity.components.position) {

            this.nodes.push({ entityId: entity.id, class: 'move', data: new MoveNode(entity.id, entity.components.position, entity.components.velocity), isActive: true });
        }

        if (entity.components.velocity && entity.components.input) {

            this.nodes.push({ entityId: entity.id, class: 'control', data: new ControlNode(entity.id, entity.components.control, entity.components.velocity), isActive: true });
        }

        if (entity.components.collision) {

            this.nodes.push({ entityId: entity.id, class: 'collision', data: new CollisionNode(entity.id, entity.components.collision, entity.components.display, entity.components.velocity), isActive: true });
        }

        if (entity.components.position) {

            this.nodes.push({ entityId: entity.id, class: 'level', data: new LevelNode(entity.id, entity.components.position), isActive: true });
        }

        return entity;
    }

    addEntities(entities) {
        if (entities && entities.length) {
            entities.map(this.addEntity.bind(this));
        }
    }

    removeEntity(entity) {

        let entityId = entity.id;

        this.entities = this.entities.filter((entity) => {
            return entity.id !== entityId;
        });

        this.nodes = this.nodes.filter((node) => {
            return node.entityId !== entityId;
        });
    }

    addSystem(system) {

        this.systems.push(system);

        system.init();
    }

    removeSystem(system) {

        system.stop();

        system = null;

        this.systems = this.systems.filter((system) => {
            return !!system;
        });
    }

    getNodesByClass(nodeClass) {
        return this.nodes.filter((node) => {
            return node.class === nodeClass;
        });
    }

    getNodesByEntityId(entityId) {
        return this.nodes.filter((node) => {
            return node.entityId === entityId;
        });
    }

    getEntityById(entityId) {
        return this.entities.filter((entity) => {
            return entity.id === entityId;
        })[0];
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

            this.nodes.filter((node) => {
                return !node.isActive;
            }).map((node) => {
                return node.entityId;
            }).filter((value, index, array) => {
                return array.indexOf(value) === index;
            }).map((id) => {
                let entity = this.getEntityById(id);
                console.log(entity);
                entity.destroy();
            });

            let results = [];

            this.systems.map((system) => {
                results.push(system.update(dt, this.getNodesByClass(system.class)));
            });

            results = results.filter((result) => { return result; });

            let newEntities = results.map((result) => {
                return result.newEntities;
            })[0];

            let deadEntities = results.map((result) => {
                return result;
            });

            this.addEntities(newEntities);
        }

        before = now;

        requestAnimationFrame(this.update.bind(this, before));
    }
}
