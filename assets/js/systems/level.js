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

        return level.entities;

    }

    getAllEntityIds(nodes) {

        let ids = nodes.map((nodes) => {
            return nodes.entityId;
        });

        ids = Array.from(new Set(ids));

        return ids;
    }

    update(time, nodes) {

        let result = {};

        if (!this.currentLevel) {
            result.deadEntities = this.getAllEntityIds(nodes);
            this.currentLevel = 1;
            result.newEntities = this.loadLevel(this.currentLevel - 1);
        }

        return result;
    }
}






