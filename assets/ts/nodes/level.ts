import INode from './inode';
import Position from '../components/position';

export default class LevelNode implements INode {

    entityId: number;
    position: Position;

    constructor (entityId: number, positionComponent: Position) {
        this.entityId = entityId;
        this.position = positionComponent;
    }
}