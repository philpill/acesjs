import Settings from './settings';
import Engine from './engine';

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

        // this.engine.addSystem(new AnimationSystem(this.settings));

        // this.engine.addSystem(new MoveSystem(this.settings));

        // this.engine.addSystem(new RenderSystem(this.settings));

        // this.engine.addSystem(new ControlSystem(this.settings));

        // this.engine.addSystem(new CollisionSystem(this.settings));

        // this.engine.addSystem(new LevelSystem(this.settings));

        this._engine.init();
    }
}
