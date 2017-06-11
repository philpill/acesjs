import Entity from './entity';

import DisplayComponent from '../components/display';
import PositionComponent from '../components/position';
import Sprite from '../sprite';

export default class SkyPrefab extends Entity {

    constructor(width: number, height: number, tile: number, mapWidth: number, mapHeight: number) {

        super();

        let texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(33, 0, 14, tile));

        let sprite = new Sprite(texture);

        sprite.height = height * tile;
        sprite.width = width * tile;

        let display = new DisplayComponent(sprite, mapWidth, mapHeight);

        let position = new PositionComponent(0, 0, mapWidth);

        this.addComponents(display, position);
    }
}