export default class Sprite extends PIXI.Sprite {

    data: {
        texture: PIXI.Rectangle[]
    };

    position: any;

    constructor(args: PIXI.Texture) {

        super(args);

        this.position = {};

        this.data = {texture: []};
    }
}