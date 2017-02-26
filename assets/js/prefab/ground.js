
import Entity from '../entity';

import DisplayComponent from '../components/display';
import PositionComponent from '../components/position';
import VelocityComponent from '../components/velocity';
import InputComponent from '../components/input';
import CollisionComponent from '../components/collision';
import AnimationComponent from '../components/animation';


export default class GroundPrefab {

    constructor(x, y, tile) {

        let ground = new Entity();

        let texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(0, 0, 14, tile));

        let thing = new PIXI.Sprite(texture);

        thing.height = tile;
        thing.width = tile;

        let display = new DisplayComponent({ sprite: thing });

        ground.addComponent(display);

        let positionComponent = new PositionComponent();

        positionComponent.x = x;
        positionComponent.y = y;

        ground.addComponent(positionComponent);

        let collision = new CollisionComponent();

        collision.type = 'secondary';

        ground.addComponent(collision);

        return ground;
    }
}