import Node from './nodes/node';
import { NodeComponents } from './nodes/node';
import Entity from './prefabs/entity';
import ISystem from './systems/isystem';
import { ClassType } from './enum';
import IComponent from './components/icomponent';
import EntityManager from './managers/entity';
import NodeManager from './managers/node';
import Settings from './settings';

type UpdateResult = { newEntities: Entity[], deadEntities: string[] };

export default class Engine {

    systems: ISystem[];
    isPaused: boolean;
    nodeManager: NodeManager;
    entityManager: EntityManager;

    constructor(settings: Settings) {

        this.systems = [];
        this.nodeManager = new NodeManager(settings);
        this.entityManager = new EntityManager(settings);
        this.isPaused = false;
    }

    init() {

        this.update();
    }

    addEntity(entity: Entity) {
        this.entityManager.addEntity(entity);
        this.nodeManager.generateNodes(entity.id, entity.components);
    }

    addEntities(entities: Entity[]) {
        if (entities && entities.length) {
            entities.map(this.addEntity, this);
        }
    }

    addSystem(system: ISystem) {
        this.systems.push(system);
        this.nodeManager.addClassType(system.classType);
        system.init();
    }

    removeSystem(system: ISystem) {
        system.stop();
        system = null;
        this.nodeManager.destroyNodesByClassType(system.classType);
        this.nodeManager.removeNodesByClassType(system.classType);
        this.systems = this.systems.filter((system: ISystem) => {
            return !!system;
        });
    }

    clearInactiveItems() {
        let inactiveEntityIds = this.entityManager.getInactiveEntityIds();
        this.nodeManager.destroyNodesByEntityIds(inactiveEntityIds);
        this.nodeManager.discardInactiveNodes();
        this.entityManager.discardInactiveEntities();
    }

    updateSystems(dt: number): UpdateResult[] {
        let results: UpdateResult[] = [];
        this.systems.map((system) => {
            let nodes = this.nodeManager.getActiveNodesByClassType(system.classType);
            let result = system.update(dt, nodes);
            results.push(result);
        });
        return results.filter((result) => { return result; });
    }

    processResults(results: UpdateResult[]) {
        let newEntities = [];
        let deadEntities = [];

        results.map((result) => {
            if (result.newEntities) {
                newEntities.push(...result.newEntities);
            }
            if (result.deadEntities) {
                let entities = result.deadEntities.map(this.entityManager.getEntityById);
                deadEntities.push(...entities);
            }
        });

        this.addEntities(newEntities);

        this.entityManager.destroyEntities(deadEntities);
    }

    update(before = 0) {

        this.isPaused = false;

        if (document.visibilityState !== 'visible') {

            this.isPaused = true;
        }

        let now = performance.now();

        let delta = (now - before)/1000;

        delta = Math.min(delta, 0.1); // magic number to prevent massive delta when tab not active

        if (!this.isPaused) {

            this.clearInactiveItems();

            let results = this.updateSystems(delta);

            this.processResults(results);
        }

        before = now;

        requestAnimationFrame(() => {
            this.update(before);
        });
    }
}
