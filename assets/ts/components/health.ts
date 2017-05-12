import IComponent from './icomponent';

export default class HealthComponent implements IComponent {

    class: string;

    health: number;

    constructor(data) {

        this.class = 'health';

        this.health = 0;
    }
}