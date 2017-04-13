/// <reference path="../dts/pixi.js.d.ts" />

export default class Sprite extends PIXI.Sprite {

    data: {
        texture: PIXI.Rectangle[]
    };

    constructor(args: PIXI.Texture) {

        super(args);

        this.data = {texture: []};
    }
}