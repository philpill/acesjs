import Settings from '../settings';
import Entity from '../prefabs/entity';

export default class EntityManager {

    settings: Settings;

    private _entities: Entity[];

    constructor(settings: Settings) {

        this.settings = settings;

        this._entities = [];
    }

    addEntity(entity: Entity) {
        this._entities.push(entity);
    }

    addEntities(entities: Entity[]) {
        entities.map(this.addEntity, this);
    }

    removeEntitiesById(entityId: string) {
        this._entities = this._entities.filter((entity: Entity) => {
            return entity.id !== entityId;
        });
    }

    destroyEntities(entities: Entity[]) {
        return entities.map((entity) => {
            return entity.destroy();
        });
    }

    getInactiveEntities(): Entity[] {
        return this._entities.filter((entity: Entity) => {
            return !entity.isActive;
        });
    }

    getEntitiesById(entityId: string) {
        return this._entities.filter((entity) => {
            return entity.id === entityId;
        });
    }

    destructor() {

    }
}