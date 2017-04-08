import IComponent from './icomponent';

export default class InputComponent implements IComponent {

    class: string;

    constructor() {

        this.class = 'input';
    }
}