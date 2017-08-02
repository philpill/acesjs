import {ITiledLevel} from '../itiled';
import {ILayer} from '../itiled';

import Entity from './entity';
import PlayerPrefab from './player';
import SkyPrefab from './sky';
import GroundPrefab from './ground';
import BackgroundPrefab from './background';
import TriggerPrefab from './trigger';
import ControlPrefab from './control';

import { TriggerType } from '../enum';
import Settings from '../settings';

class LevelPrefabData {

    type: number;
    index: number;
    position: number[];

    constructor(type: number, index: number, position: number[]) {

        this.type = type;
        this.index = index;
        this.position = position;
    }
}

export default class LevelPrefab {

    settings: Settings;
    entities: Entity[];
    data: ITiledLevel;

    constructor(settings: Settings, data: ITiledLevel) {

        this.settings = settings;
        this.data = data;
    }

    getPrefabData(data: number[]): LevelPrefabData[] {

        let values = data.map((type: number, index: number) => {

            return type === 0 ? null : new LevelPrefabData(type, index, [0, 0]);
        });

        let filteredValues = values.filter(Boolean);

        return filteredValues;
    }

    getPositionedPrefabData(data: LevelPrefabData[], mapWidth: number, tileWidth: number): LevelPrefabData[] {

        let getPositionByIndex = this.getPositionFunc(mapWidth, tileWidth);

        return data.map((val) => {

            val.position = getPositionByIndex(val.index);

            return val;
        });
    }

    getValuesByLevelData(data: ITiledLevel, layerIndex: number): LevelPrefabData[] {

        let prefabData = [];

        if (data.layers[layerIndex]) {

            let values = this.getPrefabData(data.layers[layerIndex].data);

            prefabData = this.getPositionedPrefabData(values, data.width, data.tilewidth);
        }

        return prefabData;
    }

    getPositionFunc(levelWidth: number, tileSize: number): Function {

        return (mapIndex) => {

            let x = (mapIndex % levelWidth) * tileSize;

            let y = (Math.floor(mapIndex/levelWidth)) * tileSize;

            return [x, y];
        };
    }

    getEntities(data: ITiledLevel, layerIndex: number): Entity[] {

        let values = this.getValuesByLevelData(data, layerIndex);

        let mapHeight = data.height;
        let mapWidth = data.width;

        return values.map((val) => {

            switch (val.type) {
                case 1:
                    return new GroundPrefab(val.type, val.position[0], val.position[1], mapWidth, mapHeight);
                case 4:
                case 5:
                case 6:
                case 7:
                    return new BackgroundPrefab(val.type, val.position[0], val.position[1], mapWidth, mapHeight);
                case 8:
                    return new TriggerPrefab(TriggerType.LEVELEXIT, val.position[0], val.position[1], mapWidth, mapHeight);
                case 9:
                    return new ControlPrefab(TriggerType.LEVELEXIT);
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 21:
                case 22:
                case 23:
                case 24:
                    return new BackgroundPrefab(val.type, val.position[0], val.position[1], mapWidth, mapHeight);
            }
        });
    }

    createLevel() {

        let data = this.data;

        data.entities = [];

        let sky = new SkyPrefab(data.width, data.height, data.tileheight, data.width, data.height);

        data.entities.push(sky);

        let entities: Entity[][] = data.layers.map((layer: ILayer) => {

            return this.getEntities(data, data.layers.indexOf(layer));
        });

        entities.map((layerEntities: Entity[]) => {

            data.entities.push(...layerEntities);
        });

        if (data.properties && data.properties.startX && data.properties.startY) {

            let player = new PlayerPrefab(this.settings, [data.properties.startX, data.properties.startY], data.width, data.height);

            data.entities.push(player);
        }

        return data;
    }
}