import Entity from './entity';

import DisplayComponent from '../components/display';
import PositionComponent from '../components/position';
import VelocityComponent from '../components/velocity';
import InputComponent from '../components/input';
import CollisionComponent from '../components/collision';
import AnimationComponent from '../components/animation';

import IComponent from '../components/icomponent';
import Sprite from '../sprite';
import Settings from '../settings';

export default class GroundPrefab extends Entity {

    constructor(type: number, x: number, y: number) {

        super();

        let settings = new Settings();

        let tile = settings.TILE;

        let display = this._getDisplayComponent(type, tile, tile);

        this.addComponent(display);

        let positionComponent = this._getPositionComponent(x, y);

        this.addComponent(positionComponent);

        let collision = this._getCollisionComponent();

        this.addComponent(collision);
    }

    private _getCollisionComponent() {
        let collision = new CollisionComponent();
        collision.type = 'secondary';
        return collision;
    }

    private _getPositionComponent(x: number, y: number) {
        let positionComponent = new PositionComponent();
        positionComponent.x = x;
        positionComponent.y = y;
        return positionComponent;
    }

    private _getDisplayComponent(type: number, height: number, width: number):IComponent {
        let spriteX = Math.max(type * 16 - 16, 0);
        let spriteY = 0;
        let texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(spriteX, spriteY, 14, height));
        let sprite = new Sprite(texture);
        sprite.height = height;
        sprite.width = width;
        return new DisplayComponent(sprite);
    }
}