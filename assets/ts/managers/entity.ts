import Settings from '../settings';
import Entity from '../prefabs/entity';

export default class EntityManager {

    private _settings: Settings;
    private _entities: Entity[];

    constructor(settings: Settings) {
        this._settings = settings;
        this._entities = [];
    }

    addEntity(entity: Entity): void {
        if (entity) {
            this._entities.push(entity);
        }
    }

    addEntities(entities: Entity[]): void {
        if (entities && entities.length) {
            this._entities.push(...entities);
        }
    }

    removeEntitiesById(entityId: string): void {
        this._entities = this._entities.filter((entity: Entity) => {
            return entity.id !== entityId;
        });
    }

    destroyEntities(entities: Entity[]): void {
        entities.map((entity) => {
            return entity.destroy();
        });
    }

    getInactiveEntities(): Entity[] {
        return this._entities.filter((entity: Entity) => {
            return !entity.isActive;
        });
    }

    getInactiveEntityIds(): string[] {
        let entities = this.getInactiveEntities();
        return entities.map((entity) => { return entity.id; });
    }

    getEntitiesById(entityId: string): Entity[] {
        return this._entities.filter((entity) => {
            return entity.id === entityId;
        });
    }

    getEntityById(entityId: string): Entity | null {
        let entities = this._entities.filter((entity) => {
            return entity.id === entityId;
        });
        return entities.length ? entities[0] : null;
    }

    discardInactiveEntities() {
        this._entities = this._entities.filter((entity) => {
            return entity.isActive;
        });
    }

    getEntityCount(): Number {
        return this._entities.length;
    }

    destructor() {

    }
}