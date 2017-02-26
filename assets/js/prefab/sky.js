
import Entity from '../entity';

import DisplayComponent from '../components/display';
import PositionComponent from '../components/position';


export default class SkyPrefab {

    constructor(width, height, tile) {

        let sky = new Entity();

        let texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(33, 0, 14, tile));

        let sprite = new PIXI.Sprite(texture);

        sprite.height = height * tile;
        sprite.width = width * tile;

        let display = new DisplayComponent({ sprite: sprite });

        sky.addComponent(display);

        let position = new PositionComponent();

        position.x = 0;
        position.y = 0;

        sky.addComponent(position);

        return sky;
    }
}