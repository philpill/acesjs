import IComponent from './icomponent';

export default class PositionComponent implements IComponent {

    class: string;

    x: number;
    y: number;

    constructor(x = 0, y = 0) {

        this.class = 'position';

        this.x = x;
        this.y = y;
    }
}