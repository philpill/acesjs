
import Entity from '../entity';

import DisplayComponent from '../components/display';
import PositionComponent from '../components/position';


export default class GroundPrefab {

    constructor(type, x, y, tile) {

        let ground = new Entity();

        let texture;

        if (type === 4) {
            texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(48, 0, 14, tile));

        } else if (type === 5) {
            texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(64, 0, 14, tile));
        }

        let thing = new PIXI.Sprite(texture);

        thing.height = tile;
        thing.width = tile;

        let display = new DisplayComponent({ sprite: thing });

        ground.addComponent(display);

        let positionComponent = new PositionComponent();

        positionComponent.x = x;
        positionComponent.y = y;

        ground.addComponent(positionComponent);

        return ground;
    }
}