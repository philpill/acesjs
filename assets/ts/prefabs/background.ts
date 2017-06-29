import Entity from './entity';
import DisplayComponent from '../components/display';
import PositionComponent from '../components/position';
import IComponent from '../components/icomponent';
import Sprite from '../sprite';
import Settings from '../settings';

export default class backgroundPrefab extends Entity {

    constructor(type: number, x: number, y: number, mapWidth: number, mapHeight: number) {

        super();

        let settings = new Settings();

        let tile = settings.TILE;

        let spriteTileX = type % 10;

        let spriteTileY = Math.ceil(type/10);

        console.log('spriteTileX', spriteTileX);
        console.log('spriteTileY', spriteTileY);

        let spriteX = Math.max(spriteTileX * 16 - 16, 0);
        let spriteY = Math.max(spriteTileY * 16 - 16, 0);

        let texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(spriteX, spriteY, 14, tile));

        let sprite = new Sprite(texture);

        sprite.height = tile;
        sprite.width = tile;

        let display = new DisplayComponent(sprite, mapWidth, mapHeight);

        let position = new PositionComponent(x, y, mapWidth);

        this.addComponents(display, position);
    }
}