import Entity from './entity';

import Settings from '../settings';
import Sprite from '../sprite';

import TriggerComponent from '../components/trigger';
import PositionComponent from '../components/position';
import DisplayComponent from '../components/display';
import IComponent from '../components/icomponent';


export default class TriggerPrefab extends Entity {

    constructor(type: number, x: number, y: number) {

        super();

        let triggerComponent = new TriggerComponent();

        triggerComponent.triggerType = type;

        this.addComponent(triggerComponent);

        let positionComponent = new PositionComponent();

        positionComponent.x = x;
        positionComponent.y = y;

        this.addComponent(positionComponent);


        let settings = new Settings();

        let tile = settings.TILE;


        let spriteX = 0;
        let spriteY = 0;
        let texture = new PIXI.Texture(PIXI.utils.TextureCache['trigger'], new PIXI.Rectangle(spriteX, spriteY, tile, tile));
        let sprite = new Sprite(texture);
        sprite.height = tile;
        sprite.width = tile;

        let display = new DisplayComponent(sprite);

        this.addComponent(display);
    }
}