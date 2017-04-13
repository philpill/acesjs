import INode from './nodes/inode';

interface ITypedNode {

    entityId: string;

    class: string;

    data: INode;

    isActive: boolean;
}

export default ITypedNode;