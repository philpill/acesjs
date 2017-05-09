import IComponent from './icomponent';
import { TriggerType } from '../enum';

export default class TriggerComponent implements IComponent {

    class: string;

    triggerType: TriggerType

    constructor() {

        this.class = 'trigger';

        this.triggerType = TriggerType.UNDEFINED;
    }
}