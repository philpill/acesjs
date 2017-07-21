import Node from '../nodes/node';
import Settings from '../settings';
import { ClassType } from '../enum';
import { NodeComponents } from '../nodes/node';

export default class NodeManager {

    settings: Settings;

    private _nodes: Map<ClassType, Node[]>;

    constructor(settings: Settings) {
        this.settings = settings;
        this._nodes = new Map<ClassType, Node[]>();
    }

    addClassType(classType: ClassType) {
        this._nodes[classType] = [];
    }

    addNode(node: Node) {
        this._nodes[node.classType].push(node);
    }

    addNewNode(entityId: string, classType: ClassType, components: NodeComponents) {
        let node = new Node(entityId, classType, components);
        this.addNode(node);
    }

    removeNodesByClassType(classType: ClassType) {
        this._nodes[classType] = [];
    }

    getAllNodes(): Node[] {
        let vals: Node[][] = Object.values(this._nodes);
        return [].concat.apply([], vals);
    }

    getInactiveNodes(): Node[] {
        let nodes: Node[] = this.getAllNodes();
        return nodes.filter((node: Node) => {
            return !node.isActive;
        });
    }

    getActiveNodesByClassType(classType: ClassType) {
        return this._nodes[classType].filter((node) => {
            return node.isActive;
        });
    }

    filterInactiveNodes() {
        Object.keys(this._nodes).map((classType: string) => {
            this._nodes[classType] = this._nodes[classType].filter((node: Node) => {
                return node.isActive;
            });
        });
    }

    deactivateNodesByEntityId(entityId: string): Node[] {
        let nodes: Node[] = this.getAllNodes();
        return nodes.filter((node: Node) => {
            return node.entityId === entityId;
        }).map((node: Node) => {
            this.destroySprite(node);
            node.isActive = false;
            return node;
        });
    }

    destroySprite(node: Node) {
        if (node.display && node.display.sprite) {
            node.display.sprite.destroy();
        }
    }

    destructor() {

    }
}