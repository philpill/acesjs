import IComponent from './icomponent';

export default class PositionComponent implements IComponent {

    class: string;

    x: number;
    y: number;

    expectedX: number;
    expectedY: number;

    mapWidth: number;

    constructor(x, y, mapWidth) {

        this.class = 'position';

        this.x = x;
        this.y = y;

        this.expectedX = null;
        this.expectedY = null;

        this.mapWidth = mapWidth;
    }

    destroy() {

    }
}