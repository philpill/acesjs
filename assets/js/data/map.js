export default class MapData {

    constructor() {

        this.levels = [];

        this.levels.push({
            url: '/assets/json/levelone.json',
            start: [3, 3],
            finish: [10, 5]
        });

        this.currentLevel = 1;

        this.level = this.getData();
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