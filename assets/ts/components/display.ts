import Sprite from '../sprite';
import IComponent from './icomponent';

export default class DisplayComponent implements IComponent {

    class: string;
    sprite: Sprite;
    isFocus: boolean;

    constructor(sprite: Sprite, isFocus = false) {

        this.class = 'display';

        this.sprite = sprite;

        this.isFocus = isFocus;
    }
}