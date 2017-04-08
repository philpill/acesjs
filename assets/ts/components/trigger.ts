import IComponent from './icomponent';

export default class TriggerComponent implements IComponent {

    class: string;

    constructor() {

        this.class = 'trigger';

    }
}