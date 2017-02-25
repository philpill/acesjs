import Engine from './engine';
import Entity from './entity';

import DisplayComponent from './components/display';
import PositionComponent from './components/position';
import VelocityComponent from './components/velocity';
import InputComponent from './components/input';
import CollisionComponent from './components/collision';
import AnimationComponent from './components/animation';

import MoveSystem from './systems/move';
import RenderSystem from './systems/render';
import ControlSystem from './systems/control';
import CollisionSystem from './systems/collision';
import AnimationSystem from './systems/animation';

import SettingsData from './data/settings';
import MapData from './data/map';

import PlayerPrefab from './prefab/player';

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

        this.getLevelData()
        .then(this.createLevel.bind(this))
        .then((level) => {
            this.createPlayer(this.settings, level.start);
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

        let sky = this.createSkyEntity(data.width, data.height, data.tileheight);

        this.engine.addEntity(sky);

        for (var i = 0, j = data.height; i < j; i++) {

            for (var k = 0, l = data.width; k < l; k++) {

                let val = mapData[i * data.width + k];

                if (val === 1) {

                    let ground = this.createGroundEntity(k * data.tilewidth, i * data.tilewidth, data.tileheight);

                    this.engine.addEntity(ground);
                }
            }
        }

        return level;
    }

    createSkyEntity(width, height, tile) {

        let sky = new Entity();

        let texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(33, 0, 14, tile));

        let thing = new PIXI.Sprite(texture);

        thing.height = height * tile;
        thing.width = width * tile;

        let display = new DisplayComponent({ sprite: thing });

        sky.addComponent(display);

        let positionComponent = new PositionComponent();

        positionComponent.x = 0;
        positionComponent.y = 0;

        sky.addComponent(positionComponent);

        return sky;
    }

    createGroundEntity(x, y, tile) {

        let ground = new Entity();

        let texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(0, 0, 14, tile));

        let thing = new PIXI.Sprite(texture);

        thing.height = tile;
        thing.width = tile;

        let display = new DisplayComponent({ sprite: thing });

        ground.addComponent(display);

        let positionComponent = new PositionComponent();

        positionComponent.x = x;
        positionComponent.y = y;

        ground.addComponent(positionComponent);

        let collision = new CollisionComponent();

        collision.type = 'secondary';

        ground.addComponent(collision);

        return ground;
    }

    createPlayer(settings, start) {

        let player = new PlayerPrefab(settings, start);

        this.engine.addEntity(player);
    }
}

