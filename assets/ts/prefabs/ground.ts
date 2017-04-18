import Entity from './entity';

import DisplayComponent from '../components/display';
import PositionComponent from '../components/position';
import VelocityComponent from '../components/velocity';
import InputComponent from '../components/input';
import CollisionComponent from '../components/collision';
import AnimationComponent from '../components/animation';
import Sprite from '../sprite';
import Settings from '../settings';

export default class GroundPrefab extends Entity {

    constructor(type: number, x: number, y: number) {

        super();

        let settings = new Settings();

        let tile = settings.TILE;

        let spriteXMappings = [0, 0, 16, 32, 48, 64, 80, 96];

        let spriteYMappings = [0, 0, 0, 0, 0, 0, 0, 0];

        let spriteX = spriteXMappings[type];
        let spriteY = spriteYMappings[type];

        let texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(spriteX, spriteY, 14, tile));

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