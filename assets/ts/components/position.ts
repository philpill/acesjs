import IComponent from './icomponent';

export default class PositionComponent implements IComponent {

    class: string;
    x: number;
    y: number;

    constructor() {

        this.class = 'position';

        this.x = 0;
        this.y = 0;
    }
}