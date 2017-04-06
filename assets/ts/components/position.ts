export default class PositionComponent {

    class: string;
    x: number;
    y: number;
    isPlayer: boolean;

    constructor() {

        this.class = 'position';

        this.x = 0;
        this.y = 0;

        this.isPlayer = false;
    }
}