import Engine from './engine';

import MoveSystem from './systems/move';
import RenderSystem from './systems/render';
import ControlSystem from './systems/control';
import CollisionSystem from './systems/collision';
import AnimationSystem from './systems/animation';
import LevelSystem from './systems/level';

import SettingsData from './data/settings';
import MapData from './data/map';

import PlayerPrefab from './prefab/player';
import SkyPrefab from './prefab/sky';
import GroundPrefab from './prefab/ground';

export default class Game {

    constructor() {

        this.engine = {};
    }

    init() {

        PIXI.loader.add('player', '/static/img/player.png');

        PIXI.loader.add('blue', '/static/img/blue.png');

        PIXI.loader.add('bg', '/static/img/bg.png');

        PIXI.loader.load(this.onLoad.bind(this));
    }

    onLoad() {

        this.settings = new SettingsData();

        this.engine = new Engine();

        this.engine.addSystem(new AnimationSystem(this.settings));

        this.engine.addSystem(new MoveSystem(this.settings));

        this.engine.addSystem(new RenderSystem(this.settings));

        this.engine.addSystem(new ControlSystem(this.settings));

        this.engine.addSystem(new CollisionSystem(this.settings));

        this.engine.addSystem(new LevelSystem(this.settings));

        this.getLevelData()
        .then(this.createLevel.bind(this))
        .then((level) => {
            let player = new PlayerPrefab(this.settings, level.start);
            this.engine.addEntity(player);
            this.engine.init();
        });
    }

    getLevelData() {

        let map = new MapData();

        return map.level;
    }

    createLevel(level) {

        let data = level.data;

        let mapData = level.data.layers[0].data;

        let sky = new SkyPrefab(data.width, data.height, data.tileheight);

        this.engine.addEntity(sky);

        for (var i = 0, j = data.height; i < j; i++) {

            for (var k = 0, l = data.width; k < l; k++) {

                let val = mapData[i * data.width + k];

                if (val === 1) {

                    let ground = new GroundPrefab(k * data.tilewidth, i * data.tilewidth, data.tileheight);

                    this.engine.addEntity(ground);
                }
            }
        }

        return level;
    }
}

