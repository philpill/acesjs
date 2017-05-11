import INode from './nodes/inode';
import { ClassType } from './enum'

interface ITypedNode {

    entityId: string;

    class: string;

    classType: ClassType;

    data: INode;

    isActive: boolean;
}

export default ITypedNode;