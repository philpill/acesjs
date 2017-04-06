export default class DisplayComponent {

    class: string;
    sprite: any;
    isFocus: boolean;

    constructor(data) {

        this.class = 'display';

        this.sprite = data.sprite;

        this.isFocus = false;
    }
}