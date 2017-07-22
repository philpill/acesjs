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

    // entities: Entity[];
    systems: ISystem[];
    isPaused: boolean;
    nodeManager: NodeManager;
    entityManager: EntityManager;

    constructor(settings: Settings) {

        // this.entities = [];
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
        this.nodeManager.removeNodesByClassType(system.classType);
        this.systems = this.systems.filter((system: ISystem) => {
            return !!system;
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

            let inactiveEntityIds = this.entityManager.getInactiveEntityIds();

            this.nodeManager.deactivateNodesByEntityIds(inactiveEntityIds);

            this.nodeManager.filterInactiveNodes();

            let results = [];

            this.systems.map((system) => {

                let nodes = this.nodeManager.getActiveNodesByClassType(system.classType);

                let result = system.update(dt, nodes || []);

                if (result) {
                    results.push(result);
                }
            });

            results = results.filter((result) => { return result; });

            let things = results.map((result) => {
                return result.newEntities;
            });

            let newEntities = things[0];

            let deadEntities = results.map((result) => {
                return result.deadEntities;
            });

            this.addEntities(newEntities);
        }

        before = now;

        requestAnimationFrame(this.update.bind(this, before));
    }
}
