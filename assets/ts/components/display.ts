import Sprite from '../sprite';
import IComponent from './icomponent';

export default class DisplayComponent implements IComponent {

    class: string;

    sprite: Sprite;
    isFocus: boolean;

    tile: number;

    mapHeight: number;
    mapWidth: number;

    text: PIXI.Text;

    constructor(sprite: Sprite, mapWidth: number, mapHeight: number, isFocus = false, tile = 16, text = '') {

        this.class = 'display';

        this.sprite = sprite;

        this.isFocus = isFocus;

        this.tile = tile;

        this.mapHeight = mapHeight;

        this.mapWidth = mapWidth;

        this.text = text && text.length ? new PIXI.Text(text): null;
    }

    destroy() {

        this.sprite = null;
    }
}