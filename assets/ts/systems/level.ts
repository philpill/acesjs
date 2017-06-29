import {ITiledLevel} from '../itiled';

import ISystem from './isystem';
import Settings from '../settings';
import Node from '../nodes/node';
import LevelPrefab from '../prefabs/level';
import { ClassType } from '../enum';
import { TriggerType } from '../enum';
import Entity from '../prefabs/entity';

export default class LevelSystem implements ISystem {

    classType: ClassType;
    settings: Settings;
    isLoaded: boolean;
    currentLevel: number;
    levels: any[];
    entities: Entity[];

    constructor(settings: Settings) {

        this.classType = ClassType.LEVEL;
        this.settings = settings;

        this.isLoaded = false;
        this.currentLevel;
        this.levels = [{
            data: PIXI.loader.resources.title.data
        }, {
            data: PIXI.loader.resources.level1.data
        }, {
            data: PIXI.loader.resources.level2.data
        }];
    }

    init() { }

    stop() { }

    loadLevel(levelNumber: number): Entity[] {

        console.log('loadlevel');

        console.log(levelNumber);

        let levelData = this.levels[levelNumber].data;
        let level =  new LevelPrefab(this.settings, levelData);
        let tiledLevelData = level.createLevel();
        this.entities = tiledLevelData.entities;
        return this.entities;
    }

    getAllEntityIds(nodes: Node[]) {

        let ids = nodes.map((node: Node) => {
            return node.entityId;
        });

        ids = Array.from(new Set(ids));

        return ids;
    }

    loadNextLevel() {

        // destroy all nodes
        // destroy all entities

        console.log('loadNextLevel()');

        console.log(this.entities.length);

        this.isLoaded = false;

        this.entities.map((entity) => {

            entity.destroy();
        });

        this.currentLevel++;
    }

    update(time: number, nodes: Node[]) {

        let result: any = {};

        this.currentLevel = this.currentLevel || 1;

        if (!this.isLoaded) {
            result.newEntities = this.loadLevel(this.currentLevel - 1);
            // result.deadEntities = this.getAllEntityIds(nodes);
            this.isLoaded = true;
        }

        nodes.map((node: Node) => {

            let triggerData = node.trigger;

            if (this.isLoaded && triggerData.isTriggered && triggerData.triggerType === TriggerType.LEVELEXIT) {

                console.log('FINISH');

                triggerData.isTriggered = false;

                this.loadNextLevel();
            }
        });

        return result;
    }
}






