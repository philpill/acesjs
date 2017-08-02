import ISystem from './isystem';
import Settings from '../settings';
import Node from '../nodes/node';
import LevelPrefab from '../prefabs/level';
import { ClassType } from '../enum'

export default class LevelSystem implements ISystem {

    classType: ClassType;
    settings: Settings;
    isLoaded: boolean;
    currentLevel: number;
    levels: any[];

    constructor(settings: Settings) {

        this.classType = ClassType.LEVEL;
        this.settings = settings;

        this.isLoaded = false;
        this.currentLevel;
        this.levels = [{
            data: PIXI.loader.resources.level1.data
        }];
    }

    init() {


    }

    stop() {

    }

    loadLevel(levelNumber: number) {
        let levelData = this.levels[levelNumber].data;
        let level =  new LevelPrefab(this.settings, levelData);
        return level.createLevel().entities;
    }

    getAllEntityIds(nodes: Node[]) {

        let ids = nodes.map((node: Node) => {
            return node.entityId;
        });

        ids = Array.from(new Set(ids));

        return ids;
    }

    loadNextLevel() {
        this.isLoaded = false;
        this.currentLevel++;
    }

    update(time: number, nodes: Node[]) {

        let result: any = {};

        this.currentLevel = this.currentLevel || 1;

        if (!this.isLoaded) {
            result.newEntities = this.loadLevel(this.currentLevel - 1);
            result.deadEntities = this.getAllEntityIds(nodes);
            this.isLoaded = true;
        }

        nodes.map((node: Node) => {

            // console.log(node);

            let finishX = this.levels[this.currentLevel - 1].data.properties.finishX;
            let finishY = this.levels[this.currentLevel - 1].data.properties.finishY;

            let x = node.position.x / this.settings.TILE;
            let y = node.position.y / this.settings.TILE;

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






