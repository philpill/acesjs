import ISystem from './isystem';
import Settings from '../settings';
import INode from '../nodes/inode';
import ITypedNode from '../itypedNode';
import Sprite from '../sprite';

export default class RenderSystem implements ISystem {

    class: string;
    settings: Settings;
    sprites: any;
    stage: PIXI.Container;
    container: PIXI.Container;
    renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;

    constructor(settings) {

        this.class = 'render';

        this.sprites = {};

        this.settings = settings;
    }

    init() {

        this.stage = new PIXI.Application().stage;

        this.container = new PIXI.Container();

        this.stage.addChild(this.container);

        this.renderer = PIXI.autoDetectRenderer(640, 480);

        this.stage.position.x = this.renderer.width/2; // 320
        this.stage.position.y = this.renderer.height/2; // 240

        document.body.appendChild(this.renderer.view);
    }

    stop() {

    }

    getPivotY(focusY: number): number {

        let pivotY = focusY;

        let mapHeight = this.settings.MAP[1] * this.settings.TILE;

        let screenHeight = this.renderer.height;

        pivotY = focusY < mapHeight/2 ? screenHeight/2 : focusY;
        pivotY = focusY + screenHeight/2 > mapHeight ? mapHeight - screenHeight/2 : pivotY;

        return pivotY;
    }

    getPivotX(focusX: number): number {

        let pivotX = focusX;

        let mapWidth = this.settings.MAP[0] * this.settings.TILE;

        let screenWidth = this.renderer.width;

        pivotX = focusX < screenWidth/2 ? screenWidth/2 : focusX;
        pivotX = focusX + screenWidth/2 > mapWidth ? mapWidth - screenWidth/2 : pivotX;

        return pivotX;
    }

    addNewSprites(id: string, sprite: Sprite) {

        this.sprites[id] = sprite;

        this.container.addChild(sprite);
    }

    clearDeadSprites() {

        for (let id of Object.keys(this.sprites)) {
            if (!this.sprites[id]) {
                delete this.sprites[id];
            }
        }
    }

    update(time: number, nodes: ITypedNode[]) {

        nodes.map((node: ITypedNode) => {

            let displayData = node.data.display;
            let positionData = node.data.position;

            !this.sprites[node.entityId] && this.addNewSprites(node.entityId, displayData.sprite);

            displayData.sprite.position.x = positionData.x;
            displayData.sprite.position.y = positionData.y;

            if (displayData.isFocus) {

                this.stage.pivot.x = this.getPivotX(displayData.sprite.x);
                this.stage.pivot.y = this.getPivotY(displayData.sprite.y);

                let mapWidth = this.settings.MAP[0] * this.settings.TILE;

                // test against map width * tilesize
                if (displayData.sprite.x < 0 ||
                    displayData.sprite.x + displayData.sprite.width > mapWidth) {
                    console.log('EXIT');
                }
            }
        });

        this.clearDeadSprites();

        this.renderer.render(this.stage);
    }
}