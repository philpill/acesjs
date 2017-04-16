import {ITiledLevel} from '../itiled';

import Entity from './entity';
import PlayerPrefab from './player';
import SkyPrefab from './sky';
import GroundPrefab from './ground';
import BackgroundPrefab from './background';

import Settings from '../settings';

export default class LevelPrefab {

    settings: Settings;
    entities: Entity[];
    data: ITiledLevel;

    constructor(settings: Settings, data: ITiledLevel) {

        this.settings = settings;
        this.data = data;
    }

    getGroundLayerEntities(data: ITiledLevel): Entity[] {

        let entities: Entity[] = [];

        let mapData = data.layers[0].data;

        for (var i = 0, j = data.height; i < j; i++) {

            for (var k = 0, l = data.width; k < l; k++) {

                let val = mapData[i * data.width + k];

                if (val === 1) {

                    let ground = new GroundPrefab(k * data.tilewidth, i * data.tilewidth, data.tileheight);

                    entities.push(ground);
                }
            }
        }

        return entities;
    }

    getIndexedTypes(mapData: number[], types: number[]): any {

        let indexedTypes = { };

        // { 1: [1, 2, 3], 2: [4, 5, 6] }
        types.map((type: number) => {
            indexedTypes[type] = mapData.reduce(function(a, e, i) {
                if (e === type) {
                    a.push(i);
                }
                return a;
            }, []);
        });

        return indexedTypes;
    }

    getEntities(data: ITiledLevel, indexedTypes: any): Entity[] {

        let entities: Entity[] = [];

        let types = Object.keys(indexedTypes).map(Number);

        for (const type of types) {

            let indexes = indexedTypes[type];

            indexes.map((index) => {

                let entity = this.getBackgroundEntity(type, data.width, data.tilewidth, index);

                entities.push(entity);
            });
        }

        return entities;
    }

    getBackgroundEntity(entityType: number, levelWidth: number, tileSize: number, mapIndex: number): Entity {

        let x = mapIndex % levelWidth;

        let y = Math.floor(mapIndex/levelWidth);

        let entity = new BackgroundPrefab(entityType, x * tileSize, y * tileSize, tileSize);

        return entity;
    }

    getBackgroundLayerEntities(data: ITiledLevel): Entity[] {

        let mapData = data.layers[1].data;

        let bgTypes = [4, 5, 6, 7];

        let indexedTypes = this.getIndexedTypes(mapData, bgTypes);

        let entities = this.getEntities(data, indexedTypes);

        return entities;
    }

    createLevel() {

        let data = this.data;

        data.entities = [];

        let sky = new SkyPrefab(data.width, data.height, data.tileheight);

        let groundEntities = this.getGroundLayerEntities(data);

        let bgEntities = this.getBackgroundLayerEntities(data);

        let player = new PlayerPrefab(this.settings, [data.properties.startX, data.properties.startY]);

        data.entities.push(sky, ...groundEntities, ...bgEntities, player);

        return data;
    }
}