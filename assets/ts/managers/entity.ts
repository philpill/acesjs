import Settings from '../settings';
import Entity from '../prefabs/entity';

export default class EntityManager {

    settings: Settings;

    private _entities: Entity[];

    constructor(settings: Settings) {

        this.settings = settings;

        this._entities = [];
    }

    destructor() {

    }
}