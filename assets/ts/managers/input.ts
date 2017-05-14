import Settings from '../settings';

export default class InputManager {

    settings: Settings;

    onKeyDownCallback: Function;
    onKeyUpCallback: Function;

    constructor(settings: Settings) {

        this.settings = settings;

        window.addEventListener('keydown', this.onKeyDownHandler.bind(this), false);
        window.addEventListener('keyup', this.onKeyUpHandler.bind(this), false);
    }

    destructor() {

        window.removeEventListener('keydown', this.onKeyDownHandler);
        window.removeEventListener('keyup', this.onKeyUpHandler);
    }

    onKeyDownHandler(e: KeyboardEvent) {
        return this.onKeyDownCallback(e);
    }

    onKeyUpHandler(e: KeyboardEvent) {
        return this.onKeyUpCallback(e);
    }

    onKeyUp(callback: Function) {
        this.onKeyUpCallback = callback;
    }

    onKeyDown(callback: Function) {
        this.onKeyDownCallback = callback;
    }
}