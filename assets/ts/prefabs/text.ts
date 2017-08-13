import Entity from './entity';
import DisplayComponent from '../components/display';
import PositionComponent from '../components/position';
import IComponent from '../components/icomponent';
import Sprite from '../sprite';
import Settings from '../settings';

export default class textPrefab extends Entity {

    constructor(text: string, x: number, y: number, mapWidth: number, mapHeight: number) {

        super();

        let settings = new Settings();

        let display = new DisplayComponent(null, mapWidth, mapHeight, false, 16, text);

        let position = new PositionComponent(x, y, mapWidth);

        this.addComponents(display, position);
    }
}