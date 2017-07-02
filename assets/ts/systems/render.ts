import ISystem from './isystem';
import Settings from '../settings';
import Node from '../nodes/node';
import Sprite from '../sprite';
import { ClassType } from '../enum'
import DisplayComponent from '../components/display';

export default class RenderSystem implements ISystem {

    classType: ClassType;
    settings: Settings;
    sprites: { [id: string] : PIXI.Sprite; };
    stage: PIXI.Container;
    container: PIXI.Container;
    renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;

    constructor(settings) {

        this.classType = ClassType.RENDER;

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

    getPivotY(displayData: DisplayComponent): number {

        let pivotY = displayData.sprite.y;

        let mapHeight = displayData.mapHeight * displayData.tile;

        let screenHeight = this.renderer.height;

        let maxTopY = screenHeight/2;

        let maxBottomY = mapHeight - (screenHeight/2);

        // sprite is in top section of screen
        pivotY = displayData.sprite.y < maxTopY ? maxTopY : pivotY;

        // sprite is in bottom section of screen
        pivotY = displayData.sprite.y > maxBottomY ? maxBottomY : pivotY;

        return pivotY;
    }

    getPivotX(displayData: DisplayComponent): number {

        let pivotX = displayData.sprite.x;

        let mapWidth = displayData.mapWidth * displayData.tile;

        let screenWidth = this.renderer.width;

        pivotX = displayData.sprite.x < screenWidth/2 ? screenWidth/2 : displayData.sprite.x;
        pivotX = displayData.sprite.x + screenWidth/2 > mapWidth ? mapWidth - screenWidth/2 : pivotX;

        return pivotX;
    }

    addNewSprites(id: string, sprite: Sprite) {

        this.sprites[id] = sprite;

        this.container.addChild(sprite);
    }

    removeSprite(id: string) {

        console.log('removeSprite()');
        console.log(this.sprites[id]);

        this.sprites[id].destroy(true);
        this.sprites[id] = null;
    }

    clearDeadSprites() {

        for (let id of Object.keys(this.sprites)) {
            if (!this.sprites[id]) {
                delete this.sprites[id];
            }
        }
    }

    update(time: number, nodes: Node[]) {

        nodes.map((node: Node) => {

            /* bottleneck */
            let displayData = node.display;
            let positionData = node.position;

            !this.sprites[node.entityId] && this.addNewSprites(node.entityId, displayData.sprite);

            /* bottleneck */
            displayData.sprite.position.x = positionData.x;
            displayData.sprite.position.y = positionData.y;

            if (displayData.isFocus) {

                this.stage.pivot.x = this.getPivotX(displayData);
                this.stage.pivot.y = this.getPivotY(displayData);

                let mapWidth = displayData.mapWidth * displayData.tile;

                // test against map width * tilesize
                if (displayData.sprite.x < 0 ||
                    displayData.sprite.x + displayData.sprite.width > mapWidth) {
                    console.log('EXIT');
                }
            }

            if (!this.stage.pivot.x && !this.stage.pivot.y) {

                this.stage.pivot.x = this.renderer.width / 2;
                this.stage.pivot.y = this.renderer.height / 2;
            }
        });

        this.clearDeadSprites();

        this.renderer.render(this.stage);
    }
}