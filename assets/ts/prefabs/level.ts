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

                    let ground = new GroundPrefab(0, k * data.tilewidth, i * data.tilewidth);

                    entities.push(ground);
                }
            }
        }

        return entities;
    }

    getPosition(levelWidth: number, tileSize: number): Function {

        return (mapIndex) => {

            let x = (mapIndex % levelWidth) * tileSize;

            let y = (Math.floor(mapIndex/levelWidth)) * tileSize;

            return [x, y];
        };
    }

    getEnitiesByData(data: ITiledLevel): Entity[] {

        let entities = [];

        // need to handle more than one layer
        let mapData = data.layers[1].data;

        let getPositionByIndex = this.getPosition(data.width, data.tilewidth);

        mapData.map((type: number, index: number) => {

            if (type !== 0) {

                let entity;

                let position = getPositionByIndex(index);

                switch (type) {
                    case 1:
                        entity = new GroundPrefab(type, position[0], position[1]);
                    break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        entity = new BackgroundPrefab(type, position[0], position[1]);
                    break;
                }

                entities.push(entity);
            }
        });

        return entities;
    }

    createLevel() {

        let data = this.data;

        data.entities = [];

        let sky = new SkyPrefab(data.width, data.height, data.tileheight);

        let groundEntities = this.getGroundLayerEntities(data);

        let entities = this.getEnitiesByData(data);

        let player = new PlayerPrefab(this.settings, [data.properties.startX, data.properties.startY]);

        data.entities.push(sky, ...groundEntities, ...entities, player);

        return data;
    }
}