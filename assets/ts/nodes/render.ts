import Display from '../components/display';
import Position from '../components/position';

export default class RenderNode {

    entityId: number;
    display: Display;
    position: Position;

    constructor (entityId: number, displayComponent: Display, positionComponent: Position) {
        this.entityId = entityId;
        this.display = displayComponent;
        this.position = positionComponent;
    }
}