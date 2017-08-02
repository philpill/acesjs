import Settings from '../settings';
import IComponent from './icomponent';

export default class AudioComponent implements IComponent {

    settings: Settings;
    class: string;

    constructor(settings: Settings) {

        this.settings = settings;
        this.class = 'audio';
    }

    destroy() {

    }
}