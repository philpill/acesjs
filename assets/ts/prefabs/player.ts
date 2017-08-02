import Entity from './entity';
import Sprite from '../sprite';

import DisplayComponent from '../components/display';
import PositionComponent from '../components/position';
import VelocityComponent from '../components/velocity';
import InputComponent from '../components/input';
import CollisionComponent from '../components/collision';
import AnimationComponent from '../components/animation';
import TriggerComponent from '../components/trigger';

import Settings from '../settings';

export default class PlayerPrefab extends Entity {

    constructor(settings: Settings, start: [number, number]) {

        super();

        let texture = PIXI.utils.TextureCache['/static/img/player.png'];

        let sprite = new Sprite(texture);

        sprite.data.texture.push(new PIXI.Rectangle(0, 0, 16, 32));
        sprite.data.texture.push(new PIXI.Rectangle(16, 0, 16, 32));
        sprite.data.texture.push(new PIXI.Rectangle(32, 0, 16, 32));
        sprite.data.texture.push(new PIXI.Rectangle(48, 0, 16, 32));

        texture.frame = sprite.data.texture[1];

        let display = new DisplayComponent(sprite, true);

        let animation = new AnimationComponent({
            right: [1, 2],
            left: [2, 1],
            jump: [3],
            default: [0]
        });

        let collision = new CollisionComponent('primary');

        let positionComponent = new PositionComponent(start[0] * settings.TILE, start[1] * settings.TILE);

        let velocityComponent = new VelocityComponent(settings);

        let inputComponent = new InputComponent(settings);

        this.addComponents(inputComponent, velocityComponent, positionComponent, display, collision, animation);
    }
}