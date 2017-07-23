import IComponent from './icomponent';
import { TriggerType } from '../enum';

export default class TriggerComponent implements IComponent {

    class: string;

    triggerType: TriggerType;

    isTriggered: boolean;

    constructor(type = TriggerType.UNDEFINED) {

        this.class = 'trigger';

        this.triggerType = type;

        this.isTriggered = false;
    }

    destroy() {

    }
}