import Entity from './entity';

import DisplayComponent from '../components/display';
import PositionComponent from '../components/position';
import CollisionComponent from '../components/collision';

import IComponent from '../components/icomponent';
import Sprite from '../sprite';
import Settings from '../settings';

export default class GroundPrefab extends Entity {

    constructor(type: number, x: number, y: number, mapWidth: number, mapHeight: number) {

        super();

        let settings = new Settings();

        let tile = settings.TILE;

        let display = this._getDisplayComponent(type, tile, tile, mapWidth, mapHeight);

        let position = new PositionComponent(x, y, mapWidth);

        let collision = new CollisionComponent('secondary');

        this.addComponents(display, position, collision);
    }

    private _getDisplayComponent(type: number, height: number, width: number, mapWidth: number, mapHeight: number):IComponent {
        let spriteX = Math.max(type * 16 - 16, 0);
        let spriteY = 0;
        let texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(spriteX, spriteY, 14, height));
        let sprite = new Sprite(texture);
        sprite.height = height;
        sprite.width = width;
        return new DisplayComponent(sprite, mapWidth, mapHeight);
    }
}