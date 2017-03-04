import SettingsData from '../data/settings';

import LevelPrefab from '../prefab/level';

export default class LevelSystem {

    constructor(settings) {

        this.class = 'level';
        this.settings = settings;

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

        return { newEntities: level.entities };

    }

    update(time, nodes) {

        let result = {};

        if (!this.currentLevel) {

            this.currentLevel = 1;
            result = this.loadLevel(this.currentLevel - 1);
        }

        return result;
    }
}






