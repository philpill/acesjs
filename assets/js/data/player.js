export default class PlayerData {

    constructor() {

        let texture = PIXI.utils.TextureCache['/static/img/player.png'];

        this.sprite = new PIXI.Sprite(texture);

        this.sprite.data = {};

        this.sprite.data.texture = [];

        this.sprite.data.texture.push(new PIXI.Rectangle(0, 0, 16, 32));
        this.sprite.data.texture.push(new PIXI.Rectangle(16, 0, 16, 32));
        this.sprite.data.texture.push(new PIXI.Rectangle(32, 0, 16, 32));
        this.sprite.data.texture.push(new PIXI.Rectangle(48, 0, 16, 32));

        texture.frame = this.sprite.data.texture[1];

        this.sprite.data.animation = {
            walkLeft : [2, 1],
            walkRight: [1, 2],
            jump: [3],
            default: [0]
        }
    }
}