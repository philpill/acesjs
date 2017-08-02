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

export default class PlayerPrefab {

    constructor(settings: Settings, start: [number, number]) {

        let texture = PIXI.utils.TextureCache['/static/img/player.png'];

        let sprite = new Sprite(texture);

        sprite.data.texture.push(new PIXI.Rectangle(0, 0, 16, 32));
        sprite.data.texture.push(new PIXI.Rectangle(16, 0, 16, 32));
        sprite.data.texture.push(new PIXI.Rectangle(32, 0, 16, 32));
        sprite.data.texture.push(new PIXI.Rectangle(48, 0, 16, 32));

        texture.frame = sprite.data.texture[1];

        let player = new Entity();

        let animation = new AnimationComponent();

        animation.walkRight = [1, 2];

        animation.walkLeft = [2, 1];

        animation.jump = [3];

        animation.default = [0];

        let collision = new CollisionComponent();

        collision.type = 'primary';

        let display = new DisplayComponent(sprite);

        display.isFocus = true;

        let positionComponent = new PositionComponent();

        positionComponent.x = start[0] * settings.TILE;
        positionComponent.y = start[1] * settings.TILE;

        let velocityComponent = new VelocityComponent();

        velocityComponent.accelerationY = settings.GRAVITY;

        let inputComponent = new InputComponent();

        player.addComponents(inputComponent, velocityComponent, positionComponent, display, collision, animation);

        return player;
    }
}