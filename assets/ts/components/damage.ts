import IComponent from './icomponent';

export default class DamageComponent implements IComponent {

    class: string;

    damage: number;

    constructor(data) {

        this.class = 'damage';

        this.damage = 10;
    }
}