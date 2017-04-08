import IComponent from './icomponent';

export default class DisplayComponent implements IComponent {

    class: string;
    sprite: any;
    isFocus: boolean;

    constructor(data) {

        this.class = 'display';

        this.sprite = data.sprite;

        this.isFocus = false;
    }
}