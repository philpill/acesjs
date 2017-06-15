import IComponent from './icomponent';
import Settings from '../settings';
import InputManager from '../managers/input';

export default class InputComponent implements IComponent {

    class: string;
    settings: Settings;
    inputManager: InputManager;

    isJump: boolean;
    isLeft: boolean;
    isUp: boolean;
    isRight: boolean;
    isDown: boolean;

    // isPause: any;

    constructor(settings: Settings) {

        this.class = 'input';
        this.settings = settings;

        this.inputManager = new InputManager(settings);

        this.inputManager.onKeyDown(this.onKeyDown.bind(this));
        this.inputManager.onKeyUp(this.onKeyUp.bind(this));
    }

    onKeyDown(e: KeyboardEvent) {

        let key = e.keyCode;

        this.isJump = this.isJump || key === this.settings.KEY.SPACE;
        this.isLeft = this.isLeft || key === this.settings.KEY.LEFT;
        this.isUp = this.isUp || key === this.settings.KEY.UP;
        this.isRight = this.isRight || key === this.settings.KEY.RIGHT;
        this.isDown = this.isDown || key === this.settings.KEY.DOWN;
    }

    onKeyUp(e: KeyboardEvent) {

        let key = e.keyCode;

        this.isJump = key === this.settings.KEY.SPACE ? false : this.isJump;
        this.isLeft = key === this.settings.KEY.LEFT ? false : this.isLeft;
        this.isUp = key === this.settings.KEY.UP ? false : this.isUp;
        this.isRight = key === this.settings.KEY.RIGHT ? false : this.isRight;
        this.isDown = key === this.settings.KEY.DOWN ? false : this.isDown;

        // if (key === this.settings.KEY.P) {
        //     this.isPause = !this.isPause;
        // }
    }
}