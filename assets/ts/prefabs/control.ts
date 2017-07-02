import Entity from './entity';

import Settings from '../settings';
import Sprite from '../sprite';

import TriggerComponent from '../components/trigger';
import PositionComponent from '../components/position';
import CollisionComponent from '../components/collision';
import DisplayComponent from '../components/display';
import InputComponent from '../components/input';

import IComponent from '../components/icomponent';

import { TriggerType } from '../enum';

export default class ControlPrefab extends Entity {

    constructor(type: TriggerType) {

        super();

        let trigger = new TriggerComponent(type);

        let position = new PositionComponent(0, 0, 0);

        let settings = new Settings();

        let tile = settings.TILE;

        let texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(0, 0, 1, 1));
        let sprite = new Sprite(texture);

        let display = new DisplayComponent(sprite, 0, 0);

        let input = new InputComponent(settings);

        input.inputManager.onKeyUp((e: KeyboardEvent) => {

            let key = e.keyCode;

            if (key === settings.KEY.SPACE) {

                console.log('TRIGGER');

                trigger.isTriggered = true;
            }
        });


        this.addComponents(trigger, position, display, input);
    }
}