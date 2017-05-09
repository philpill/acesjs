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

    getSignificantValues(data: ITiledLevel, layerIndex = 0): { type: number, position: number[] }[] {

        let mapData = data.layers[layerIndex].data;

        let getPositionByIndex = this.getPositionFunc(data.width, data.tilewidth);

        return mapData.map((type: number, index: number) => {

            if (type !== 0) {

                return { type: type, position: getPositionByIndex(index) };
            }
        });
    }

    getGroundEntities(data: ITiledLevel): Entity[] {

        let values = this.getSignificantValues(data, 0);

        return values.map((val) => {
            switch (val.type) {
                case 1:
                    return new GroundPrefab(0, val.position[0], val.position[1]);
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

        let values = this.getSignificantValues(data, 1);

        return values.map((val) => {

            switch (val.type) {
                case 1:
                    return new GroundPrefab(val.type, val.position[0], val.position[1]);
                case 4:
                case 5:
                case 6:
                case 7:
                    return new BackgroundPrefab(val.type, val.position[0], val.position[1]);
            }
        });
    }

    createLevel() {

        let data = this.data;

        data.entities = [];

        let sky = new SkyPrefab(data.width, data.height, data.tileheight);

        let groundEntities = this.getGroundEntities(data);

        let backgroundEntities = this.getBackgroundEntities(data);

        let player = new PlayerPrefab(this.settings, [data.properties.startX, data.properties.startY]);

        data.entities.push(sky, ...groundEntities, ...backgroundEntities, player);

        return data;
    }
}