import INode from './inode';
import Display from '../components/display';
import Position from '../components/position';

export default class RenderNode implements INode {

    entityId: number;

        display: Display;
        position: Position;

    isActive: boolean;

    constructor (entityId: number, displayComponent: Display, positionComponent: Position) {
        this.entityId = entityId;
        this.display = displayComponent;
        this.position = positionComponent;
        this.isActive = true;
    }
}