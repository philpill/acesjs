
import Entity from '../entity';

import DisplayComponent from '../components/display';
import PositionComponent from '../components/position';
import VelocityComponent from '../components/velocity';
import InputComponent from '../components/input';
import CollisionComponent from '../components/collision';
import AnimationComponent from '../components/animation';


export default class PlayerPrefab {

    constructor(settings, start) {

        let texture = PIXI.utils.TextureCache['/static/img/player.png'];

        let sprite = new PIXI.Sprite(texture);

        sprite.data = {};

        sprite.data.texture = [];

        sprite.data.texture.push(new PIXI.Rectangle(0, 0, 16, 32));
        sprite.data.texture.push(new PIXI.Rectangle(16, 0, 16, 32));
        sprite.data.texture.push(new PIXI.Rectangle(32, 0, 16, 32));
        sprite.data.texture.push(new PIXI.Rectangle(48, 0, 16, 32));

        texture.frame = sprite.data.texture[1];

        sprite.data.animation = {
            walkLeft : [2, 1],
            walkRight: [1, 2],
            jump: [3],
            default: [0]
        }

        let player = new Entity();

        let animation = new AnimationComponent();

        animation.walkRight = sprite.data.animation.walkRight;

        animation.walkLeft = sprite.data.animation.walkLeft;

        animation.jump = sprite.data.animation.jump;

        animation.default = sprite.data.animation.default;

        let collision = new CollisionComponent();

        collision.type = 'primary';

        let display = new DisplayComponent({ sprite: sprite });

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