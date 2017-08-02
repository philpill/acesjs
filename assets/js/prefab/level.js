
import PlayerPrefab from './player';
import SkyPrefab from './sky';
import GroundPrefab from './ground';
import BackgroundPrefab from './background';

export default class LevelPrefab {

    constructor(settings, data) {

        this.settings = settings;

        return this.createLevel(data);
    }

    createLayer(data) {

        let mapData = data.layers[0].data;

        for (var i = 0, j = data.height; i < j; i++) {

            for (var k = 0, l = data.width; k < l; k++) {

                let val = mapData[i * data.width + k];

                if (val === 1) {

                    let ground = new GroundPrefab(k * data.tilewidth, i * data.tilewidth, data.tileheight);

                    data.entities.push(ground);
                }
            }
        }
    }

    createBackgroundLayer(data) {

        let mapData = data.layers[1].data;

        for (var i = 0, j = data.height; i < j; i++) {

            for (var k = 0, l = data.width; k < l; k++) {

                let val = mapData[i * data.width + k];

                if (val === 4) {

                    let bg = new BackgroundPrefab(4, k * data.tilewidth, i * data.tilewidth, data.tileheight);

                    data.entities.push(bg);
                }
            }
        }
    }

    createLevel(data) {

        let mapData = data.layers[0].data;

        data.entities = [];

        let sky = new SkyPrefab(data.width, data.height, data.tileheight);

        data.entities.push(sky);

        this.createLayer(data);

        this.createBackgroundLayer(data);

        let player = new PlayerPrefab(this.settings, [data.properties.startX, data.properties.startY]);

        data.entities.push(player);

        return data;
    }
}