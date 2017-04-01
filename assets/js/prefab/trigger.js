
import Entity from '../entity';

import TriggerComponent from '../components/trigger';
import PositionComponent from '../components/position';


export default class TriggerPrefab {

    constructor(type, x, y, tile) {

        let trigger = new Entity();

        let triggerComponent = new TriggerComponent();

        trigger.addComponent(positionComponent);

        let positionComponent = new PositionComponent();

        positionComponent.x = x;
        positionComponent.y = y;

        trigger.addComponent(positionComponent);

        return trigger;
    }
}