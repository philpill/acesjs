import SettingsData from '../data/settings';

import PlayerPrefab from '../prefab/player';
import SkyPrefab from '../prefab/sky';
import GroundPrefab from '../prefab/ground';

export default class LevelSystem {

    constructor(settings) {

        this.class = 'level';
        this.settings = settings;

        this.currentLevel = 1;
        this.levels = [];

        this.levels.push({
            url: 'blank',
            start: [0, 0],
            finish: [0, 0],
        },{
            url: '/assets/json/levelone.json',
            start: [3, 3],
            finish: [3, 4]
        });
    }

    init() {

        this.getLevelData()
        .then(this.createLevel)
        .then((level) => {
            console.log(level);
        });
    }

    getLevelData() {

        let levelData = this.levels[this.currentLevel];

        return fetch(levelData.url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            levelData.data = data;
            return levelData;
        });
    }

    createLevel(level) {

        let data = level.data;

        let mapData = level.data.layers[0].data;

        let sky = new SkyPrefab(data.width, data.height, data.tileheight);

        // this.engine.addEntity(sky);

        for (var i = 0, j = data.height; i < j; i++) {

            for (var k = 0, l = data.width; k < l; k++) {

                let val = mapData[i * data.width + k];

                if (val === 1) {

                    let ground = new GroundPrefab(k * data.tilewidth, i * data.tilewidth, data.tileheight);

                    // this.engine.addEntity(ground);
                }
            }
        }

        return level;
    }

    update(time, nodes) {

        let finish = this.levels[this.currentLevel].finish;

        nodes.map((node) => {

            let position = [node.data.position.x, node.data.position.y];

            // spawn player at start

            if (position === finish) {

                console.log('FINISH');
            }
        });
    }
}






