import Entity from './entity';

import Settings from '../settings';
import Sprite from '../sprite';

import TriggerComponent from '../components/trigger';
import PositionComponent from '../components/position';
import CollisionComponent from '../components/collision';
import DisplayComponent from '../components/display';
import IComponent from '../components/icomponent';

import { TriggerType } from '../enum';

export default class TriggerPrefab extends Entity {

    constructor(type: TriggerType, x: number, y: number) {

        super();

        let trigger = new TriggerComponent(type);

        let position = new PositionComponent(x, y);

        let collision = new CollisionComponent('secondary');

        collision.collide = () => {

            // console.log('TRIGGER');

            trigger.isTriggered = true;

            collision.collide = () => {};
        };

        let settings = new Settings();

        let tile = settings.TILE;

        let spriteX = 0;
        let spriteY = 0;
        let texture = new PIXI.Texture(PIXI.utils.TextureCache['trigger'], new PIXI.Rectangle(spriteX, spriteY, tile, tile));
        let sprite = new Sprite(texture);
        sprite.height = tile;
        sprite.width = tile;

        let display = new DisplayComponent(sprite);

        this.addComponents(trigger, position, collision, display);
    }
}