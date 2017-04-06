import Position from '../components/position';

export default class LevelNode {

    entityId: number;
    position: Position;

    constructor (entityId: number, positionComponent: Position) {
        this.entityId = entityId;
        this.position = positionComponent;
    }
}