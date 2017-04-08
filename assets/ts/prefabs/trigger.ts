import Entity from './entity';

import TriggerComponent from '../components/trigger';
import PositionComponent from '../components/position';


export default class TriggerPrefab {

    constructor(type: number, x: number, y: number, tile: number) {

        let trigger = new Entity();

        let triggerComponent = new TriggerComponent();

        trigger.addComponent(triggerComponent);

        let positionComponent = new PositionComponent();

        positionComponent.x = x;
        positionComponent.y = y;

        trigger.addComponent(positionComponent);

        return trigger;
    }
}