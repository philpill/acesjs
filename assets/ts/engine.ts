import Node from './nodes/node';
import { NodeComponents } from './nodes/node';
import Entity from './prefabs/entity';
import ISystem from './systems/isystem';
import { ClassType } from './enum'
import IComponent from './components/icomponent'

export default class Engine {

    entities: Entity[];
    systems: ISystem[];
    nodes: Node[];
    isPaused: boolean;

    constructor() {

        this.entities = [];
        this.systems = [];
        this.nodes = [];

        this.isPaused = false;
    }

    init() {

        this.update();
    }

    addEntity(entity: Entity) {

        this.entities.push(entity);

        let entityComponents = entity.components;

        let nodes = this.generateNodes(entity.id, entityComponents);

        this.nodes.push(...nodes);

        return entity;
    }

    generateNodes(entityId: string, components: NodeComponents) {

        let nodes = [];

        if (components.display && components.position) {

            nodes.push(new Node(entityId, ClassType.RENDER, components));
        }

        if (components.animation && components.display && components.velocity) {

            nodes.push(new Node(entityId, ClassType.ANIMATION, components));
        }

        if (components.velocity && components.position && components.collision) {

            nodes.push(new Node(entityId, ClassType.MOVE, components));
        }

        if (components.velocity && components.input) {

            nodes.push(new Node(entityId, ClassType.CONTROL, components));
        }

        if (components.collision && components.display) {

            nodes.push(new Node(entityId, ClassType.OBSTACLE_COLLISION, components));
        }

        if (components.collision && components.display && components.trigger) {

            nodes.push(new Node(entityId, ClassType.TRIGGER_COLLISION, components));
        }

        if (components.position && components.input) { // need a second 'trigger' component or this will apply to all rendered objects

            nodes.push(new Node(entityId, ClassType.LEVEL, components));
        }

        return nodes;
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

    destroyEntities(entities: Entity[]) {
        return entities.map((entity) => {
            return entity.destroy();
        });
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

    getEntitiesByInactiveNodes(nodes: Node[]) {

        return nodes.filter((node) => {
            return !node.isActive;
        }).map((node) => {
            return node.entityId;
        }).filter((value, index, array) => {
            return array.indexOf(value) === index;
        }).map((id) => {
            return this.getEntitiesById(id);
        }).reduce((acc, entities) => {
            return acc.concat(entities);
        }, []);
    }

    filterInactiveNodes(nodes: Node[]) {

        let inactiveEntities = this.getEntitiesByInactiveNodes(nodes);

        this.destroyEntities(inactiveEntities);

        return nodes.filter((node) => {
            return node.isActive;
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

            this.nodes = this.filterInactiveNodes(this.nodes);

            let results = [];

            this.systems.map((system) => {
                let nodes = this.nodes.filter((node) => {
                    return node.classType === system.classType;
                });
                results.push(system.update(dt, nodes || []));
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
