export default class Settings {

    GRAVITY: number;
    FRICTION: number;
    TILE: number;
    MAP: number[];
    KEY: {
        SPACE: number,
        LEFT: number,
        UP: number,
        RIGHT: number,
        DOWN: number,
        P: number
    };

    constructor() {

        this.GRAVITY = 10;
        this.FRICTION = 0.80;
        this.TILE = 16;
        this.MAP = [45, 30];
        this.KEY = { SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, P: 80 };
    }
}