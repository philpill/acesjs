import Entity from './entity';
import DisplayComponent from '../components/display';
import PositionComponent from '../components/position';

export default class GroundPrefab {

    constructor(type: number, x: number, y: number, tile: number) {

        let ground = new Entity();

        let texture;

        if (type === 4) {
            texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(48, 0, 14, tile));

        } else if (type === 5) {
            texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(64, 0, 14, tile));
        }

        let sprite = new PIXI.Sprite(texture);

        sprite.height = tile;
        sprite.width = tile;

        let display = new DisplayComponent({ sprite: sprite });

        ground.addComponent(display);

        let positionComponent = new PositionComponent();

        positionComponent.x = x;
        positionComponent.y = y;

        ground.addComponent(positionComponent);

        return ground;
    }
}