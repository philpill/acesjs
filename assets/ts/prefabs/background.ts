import Entity from './entity';
import DisplayComponent from '../components/display';
import PositionComponent from '../components/position';
import IComponent from '../components/icomponent';
import Sprite from '../sprite';
import Settings from '../settings';

export default class backgroundPrefab extends Entity {

    constructor(type: number, x: number, y: number) {

        super();

        let settings = new Settings();

        let tile = settings.TILE;

        let spriteX = Math.max(type * 16 - 16, 0);
        let spriteY = 0;

        let texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(spriteX, spriteY, 14, tile));

        let sprite = new Sprite(texture);

        sprite.height = tile;
        sprite.width = tile;

        let display = new DisplayComponent(sprite);

        let position = new PositionComponent(x, y);

        this.addComponents(display, position);
    }
}