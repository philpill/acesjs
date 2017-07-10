import IComponent from './icomponent';

export default class PositionComponent implements IComponent {

    class: string;

    x: number;
    y: number;
    mapWidth: number;
    outOfBounds: boolean;

    constructor(x, y, mapWidth) {

        this.class = 'position';

        this.x = x;
        this.y = y;

        this.mapWidth = mapWidth;

        this.outOfBounds = false;
    }
}