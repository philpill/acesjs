import IComponent from './icomponent';

export default class UserComponent implements IComponent {

    class: string;

    constructor() {

        this.class = 'user';

    }
}