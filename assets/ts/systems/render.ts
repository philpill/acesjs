import ISystem from './isystem';
import Settings from '../settings';
import INode from '../nodes/inode';
import ITypedNode from '../itypedNode';

export default class RenderSystem implements ISystem {

    class: string;
    settings: Settings;
    sprites: any;
    stage: any;
    container: any;
    renderer: any;

    constructor(settings) {

        this.class = 'render';

        this.sprites = {};

        this.stage = {};

        this.container = {};

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

    update(time: number, nodes: ITypedNode[]) {

        // console.log('render update');

        for (var i = 0, j = nodes.length; i < j; i++) {

            let id = nodes[i].entityId;

            let displayData = nodes[i].data.display;
            let positionData = nodes[i].data.position;

            if (!this.sprites.hasOwnProperty(id)) {

                let sprite = displayData.sprite;

                this.sprites[id] = sprite;

                this.container.addChild(sprite);
            }

            // console.log(nodes[i].position);
            // console.log(nodes[i].display);

            displayData.sprite.position.x = positionData.x;
            displayData.sprite.position.y = positionData.y;

            if (displayData.isFocus) {

                let x = displayData.sprite.x;
                let width = displayData.sprite.width;
                let y = displayData.sprite.y;
                let height = displayData.sprite.height;


                let mapWidth = this.settings.MAP[0] * this.settings.TILE;
                let mapHeight = this.settings.MAP[1] * this.settings.TILE;

                let screenWidth = this.renderer.width;
                let screenHeight = this.renderer.height;

                // console.log('mapWidth ', mapWidth);
                // console.log('screenWidth ', screenWidth);

                let pivotX = x < screenWidth/2 ? screenWidth/2 : x;
                pivotX = x + screenWidth/2 > mapWidth ? mapWidth - screenWidth/2 : pivotX;

                this.stage.pivot.x = pivotX;

                // console.log(pivotX);

                let pivotY = y < mapHeight/2 ? screenHeight/2 : y;
                pivotY = y + screenHeight/2 > mapHeight ? mapHeight - screenHeight/2 : pivotY;

                this.stage.pivot.y = pivotY;



                // test against map width * tilesize
                if (displayData.sprite.x < 0 ||
                    displayData.sprite.x + displayData.sprite.width > mapWidth) {
                    console.log('EXIT');
                }

                // console.log('x', this.stage.pivot.x);
                // console.log('y', this.stage.pivot.y);
            }
        }

        for (let id of Object.keys(this.sprites)) {
            if (!this.sprites[id]) {
                delete this.sprites[id];
            }
        }

        this.renderer.render(this.stage);
    }
}