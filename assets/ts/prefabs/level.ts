import {ITiledLevel} from '../itiled';

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

    constructor(type, index, position) {

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

        let values = this.getPrefabData(data.layers[layerIndex].data);

        return this.getPositionedPrefabData(values, data.width, data.tilewidth);
    }

    getGroundEntities(data: ITiledLevel): Entity[] {

        let values = this.getValuesByLevelData(data, 0);

        let mapHeight = data.height;
        let mapWidth = data.width;

        return values.map((val) => {
            switch (val.type) {
                case 1:
                    return new GroundPrefab(0, val.position[0], val.position[1], mapWidth, mapHeight);
            }
        });
    }

    getPositionFunc(levelWidth: number, tileSize: number): Function {

        return (mapIndex) => {

            let x = (mapIndex % levelWidth) * tileSize;

            let y = (Math.floor(mapIndex/levelWidth)) * tileSize;

            return [x, y];
        };
    }

    getBackgroundEntities(data: ITiledLevel): Entity[] {

        let values = this.getValuesByLevelData(data, 1);

        let mapHeight = data.height;
        let mapWidth = data.width;

        return values.map((val) => {

            switch (val.type) {
                case 1:
                    return new GroundPrefab(val.type, val.position[0], val.position[1], mapWidth, mapHeight);
                case 4:
                case 5:
                case 6:
                    return new BackgroundPrefab(val.type, val.position[0], val.position[1], mapWidth, mapHeight);
                case 7:
                    return new ControlPrefab(TriggerType.LEVELEXIT);
            }
        });
    }

    getTriggerEntities(data: ITiledLevel): Entity[] {

        let values = this.getValuesByLevelData(data, 2);

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
                case 11:
                    return new TriggerPrefab(TriggerType.LEVELEXIT, val.position[0], val.position[1], mapWidth, mapHeight);
            }
        });
    }

    createLevel() {

        let data = this.data;

        data.entities = [];

        let sky = new SkyPrefab(data.width, data.height, data.tileheight, data.width, data.height);

        let groundEntities = this.getGroundEntities(data);

        let backgroundEntities = this.getBackgroundEntities(data);

        let triggerEntities = this.getTriggerEntities(data);

        let player = new PlayerPrefab(this.settings, [data.properties.startX, data.properties.startY], data.width, data.height);

        data.entities.push(sky, ...groundEntities, ...backgroundEntities, ...triggerEntities, player);

        return data;
    }
}