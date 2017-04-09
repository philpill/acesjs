import Settings from './settings';
import Engine from './engine';

import AnimationSystem from './systems/animation';
import CollisionSystem from './systems/collision';
import ControlSystem from './systems/control';
import LevelSystem from './systems/level';
import MoveSystem from './systems/move';
import RenderSystem from './systems/render';

export default class Game {

    private _engine: Engine;
    private _settings: Settings;

    constructor() {

        console.log('GAME');
    }

    public init() {

        PIXI.loader.add('player', '/static/img/player.png');
        PIXI.loader.add('bg', '/static/img/bg.png');
        PIXI.loader.add('level1', '/assets/json/levelone.json');

        PIXI.loader.load(this._onLoad.bind(this));
    }

    private _onLoad() {

        this._settings = new Settings();
        this._engine = new Engine();

        this._engine.addSystem(new AnimationSystem(this._settings));

        this._engine.addSystem(new MoveSystem(this._settings));

        this._engine.addSystem(new RenderSystem(this._settings));

        this._engine.addSystem(new ControlSystem(this._settings));

        this._engine.addSystem(new CollisionSystem(this._settings));

        this._engine.addSystem(new LevelSystem(this._settings));

        this._engine.init();
    }
}
