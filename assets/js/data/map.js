export default class MapData {

    constructor() {

        this.sprite = this.getSprite();

        this.levels = [];

        this.levels.push({
            url: '/assets/json/levelone.json',
            start: [3, 3]
        });

        this.currentLevel = 1;

        this.level = this.getData();
    }

    getSprite() {

        let texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(32, 0, 16, 16));

        return new PIXI.Sprite(texture);
    }

    getData() {

        let levelData = this.levels[this.currentLevel - 1];

        return fetch(levelData.url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            levelData.data = data;
            return levelData;
        });
    }
}