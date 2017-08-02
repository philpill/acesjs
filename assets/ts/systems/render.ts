import ISystem from './isystem';
import Settings from '../settings';
import INode from '../nodes/inode';

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

    update(time: number, nodes: INode[]) {

        // console.log('render update');

        for (var i = 0, j = nodes.length; i < j; i++) {

            let id = nodes[i].entityId;

            if (!this.sprites.hasOwnProperty(id)) {

                let sprite = nodes[i].display.sprite;

                this.sprites[id] = sprite;

                this.container.addChild(sprite);
            }

            // console.log(nodes[i].position);
            // console.log(nodes[i].display);

            nodes[i].display.sprite.position.x = nodes[i].position.x;
            nodes[i].display.sprite.position.y = nodes[i].position.y;

            if (nodes[i].display.isFocus) {

                let x = nodes[i].display.sprite.x;
                let width = nodes[i].display.sprite.width;
                let y = nodes[i].display.sprite.y;
                let height = nodes[i].display.sprite.height;


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
                if (nodes[i].display.sprite.x < 0 ||
                    nodes[i].display.sprite.x + nodes[i].display.sprite.width > mapWidth) {
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