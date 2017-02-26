import SettingsData from '../data/settings';

import PlayerPrefab from '../prefab/player';
import SkyPrefab from '../prefab/sky';
import GroundPrefab from '../prefab/ground';

export default class LevelSystem {

    constructor(settings) {

        this.class = 'level';
        this.settings = settings;

        this.currentLevel = 1;
        this.levels = [];


    }

    init() {


    }


    update(time, nodes) {

        nodes.map((node) => {


        });
    }
}






