export default class RenderSystem {

    constructor(settings) {

        this.class = 'render';

        this.sprites = {};

        this.stage = {};

        this.container = {};

        this.settings = settings;
    }

    init() {

        this.stage = new PIXI.Stage();

        this.container = new PIXI.Container();

        this.stage.addChild(this.container);

        this.renderer = PIXI.autoDetectRenderer(640, 480);

        this.stage.position.x = this.renderer.width/2; // 320
        this.stage.position.y = this.renderer.height/2; // 240

        document.body.appendChild(this.renderer.view);
    }

    update(time, nodes) {

        // console.log('render update');

        for (var i = 0, j = nodes.length; i < j; i++) {

            let id = nodes[i].data.entityId;

            if (!this.sprites.hasOwnProperty(id)) {

                let sprite = nodes[i].data.display.sprite;

                this.sprites[id] = sprite;

                this.container.addChild(sprite);
            }

            // console.log(nodes[i].data.position);
            // console.log(nodes[i].data.display);

            nodes[i].data.display.sprite.position.x = nodes[i].data.position.x;
            nodes[i].data.display.sprite.position.y = nodes[i].data.position.y;

            if (nodes[i].data.display.isFocus) {

                let x = nodes[i].data.display.sprite.x;
                let width = nodes[i].data.display.sprite.width;
                let y = nodes[i].data.display.sprite.y;
                let height = nodes[i].data.display.sprite.height;


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
                if (nodes[i].data.display.sprite.x < 0 ||
                    nodes[i].data.display.sprite.x + nodes[i].data.display.sprite.width > mapWidth) {
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