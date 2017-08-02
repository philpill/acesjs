import Node from './nodes/node';
import { NodeComponents } from './nodes/node';
import Entity from './prefabs/entity';
import ISystem from './systems/isystem';
import { ClassType } from './enum';
import IComponent from './components/icomponent';
import EntityManager from './managers/entity';
import NodeManager from './managers/node';
import Settings from './settings';
export default class Engine {

    entities: Entity[];
    systems: ISystem[];
    isPaused: boolean;
    nodeManager: NodeManager;
    entityManager: EntityManager;

    constructor(settings: Settings) {

        this.entities = [];
        this.systems = [];
        this.nodeManager = new NodeManager(settings);
        this.entityManager = new EntityManager(settings);
        this.isPaused = false;
    }

    init() {

        this.update();
    }

    addEntity(entity: Entity) {

        this.entities.push(entity);

        let entityComponents = entity.components;

        this.nodeManager.generateNodes(entity.id, entityComponents);

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

    destroyEntities(entities: Entity[]) {
        return entities.map((entity) => {
            return entity.destroy();
        });
    }

    addSystem(system: ISystem) {
        this.systems.push(system);
        this.nodeManager.addClassType(system.classType);
        system.init();
    }

    removeSystem(system: ISystem) {
        system.stop();
        system = null;
        this.nodeManager.removeNodesByClassType(system.classType);
        this.systems = this.systems.filter((system: ISystem) => {
            return !!system;
        });
    }

    getEntitiesById(entityId: string) {
        return this.entities.filter((entity: Entity) => {
            return entity.id === entityId;
        });
    }

    getEntityIdsByNodes(nodes: Node[]): string[] {

        let ids = nodes.map((node) => {
            return node.entityId;
        });

        // unique values only
        return [...new Set(ids)];
    }

    filterInactiveNodes(nodes: Node[]) {

        let inactiveNodes = this.nodeManager.getInactiveNodes();

        let entityIds = this.getEntityIdsByNodes(inactiveNodes);

        let entities = entityIds.map((id) => {

            return this.getEntitiesById(id)[0];
        });

        this.destroyEntities(entities);

        return nodes.filter((node) => {
            return node.isActive;
        });
    }

    getInactiveEntityIds(): string[] {
        let entities = this.entities.filter((entity) => {

            return !entity.isActive;
        });

        return entities.map((entity) => {

            return entity.id;
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

            let inactiveEntityIds = this.getInactiveEntityIds();

            this.nodeManager.deactivateNodesByEntityIds(inactiveEntityIds);

            this.nodeManager.filterInactiveNodes();

            let results = [];

            this.systems.map((system) => {

                let nodes = this.nodeManager.getActiveNodesByClassType(system.classType);

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
