import Engine from './engine';

import MoveSystem from './systems/move';
import RenderSystem from './systems/render';
import ControlSystem from './systems/control';
import CollisionSystem from './systems/collision';
import AnimationSystem from './systems/animation';
import LevelSystem from './systems/level';

import SettingsData from './data/settings';

import PlayerPrefab from './prefab/player';
import LevelPrefab from './prefab/level';

export default class Game {

    constructor() {

        this.engine = {};
    }

    init() {

        PIXI.loader.add('player', '/static/img/player.png');

        PIXI.loader.add('bg', '/static/img/bg.png');

        PIXI.loader.add('level1', '/assets/json/levelone.json');

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

        this.engine.init();
    }
}

