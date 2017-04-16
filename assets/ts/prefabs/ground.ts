import Entity from './entity';

import DisplayComponent from '../components/display';
import PositionComponent from '../components/position';
import VelocityComponent from '../components/velocity';
import InputComponent from '../components/input';
import CollisionComponent from '../components/collision';
import AnimationComponent from '../components/animation';
import Sprite from '../sprite';

export default class GroundPrefab extends Entity {

    constructor(x: number, y: number, tile: number) {

        super();

        let texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(0, 0, 14, tile));

        let sprite = new Sprite(texture);

        sprite.height = tile;
        sprite.width = tile;

        let display = new DisplayComponent(sprite);

        this.addComponent(display);

        let positionComponent = new PositionComponent();

        positionComponent.x = x;
        positionComponent.y = y;

        this.addComponent(positionComponent);

        let collision = new CollisionComponent();

        collision.type = 'secondary';

        this.addComponent(collision);
    }
}