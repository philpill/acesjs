import SettingsData from '../data/settings';

import LevelPrefab from '../prefab/level';

export default class LevelSystem {

    constructor(settings) {

        this.class = 'level';
        this.settings = settings;

        this.isLoaded = false;
        this.currentLevel;
        this.levels = [{
            data: PIXI.loader.resources.level1.data
        }];
    }

    init() {


    }

    loadLevel(levelNumber) {
        let levelData = this.levels[levelNumber].data;
        let level =  new LevelPrefab(this.settings, levelData);
        return level.entities;
    }

    getAllEntityIds(nodes) {

        let ids = nodes.map((nodes) => {
            return nodes.entityId;
        });

        ids = Array.from(new Set(ids));

        return ids;
    }

    loadNextLevel() {
        this.isLoaded = false;
        this.currentLevel++;
    }

    update(time, nodes) {

        let result = {};

        this.currentLevel = this.currentLevel || 1;

        if (!this.isLoaded) {
            result.newEntities = this.loadLevel(this.currentLevel - 1);
            result.deadEntities = this.getAllEntityIds(nodes);
            this.isLoaded = true;
        }

        nodes.map((node) => {

            // console.log(node);

            let finishX = this.levels[this.currentLevel - 1].data.properties.finishX;
            let finishY = this.levels[this.currentLevel - 1].data.properties.finishY;

            let x = node.data.position.x / this.settings.TILE;
            let y = node.data.position.y / this.settings.TILE;

            // console.log(x + ' ' + y);

            if (finishX === x && finishY === y) {

                console.log('FINISH');

                // this.loadNextLevel();
            }

        });

            // console.log(this.levels[this.currentLevel]);

            // console.log(this.levels[this.currentLevel - 1].data.properties.finishX);

        return result;
    }
}






