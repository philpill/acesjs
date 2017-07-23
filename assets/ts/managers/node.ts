import Node from '../nodes/node';
import Settings from '../settings';
import { ClassType } from '../enum';
import { NodeComponents } from '../nodes/node';

export default class NodeManager {

    private _settings: Settings;
    private _nodes: any;

    constructor(settings: Settings) {
        this._settings = settings;
        this._nodes = {};
    }

    addClassType(classType: ClassType): void {
        this._nodes[classType] = [];
    }

    addNode(node: Node): void {
        this._nodes[node.classType].push(node);
    }

    addNewNode(entityId: string, classType: ClassType, components: NodeComponents): Node {
        let node = new Node(entityId, classType, components);
        this.addNode(node);
        return node;
    }

    removeNodesByClassType(classType: ClassType): void {
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

    getActiveNodesByClassType(classType: ClassType): Node[] {
        return this._nodes[classType].filter((node) => {
            return node.isActive;
        });
    }

    filterInactiveNodes(): void {
        Object.keys(this._nodes).map((classType: string) => {
            this._nodes[classType] = this._nodes[classType].filter((node: Node) => {
                return node.isActive;
            });
        });
    }

    deactivateNodesByClassType(classType: ClassType): void {
        this._nodes[classType].map((node: Node) => {
            node.isActive = false;
        });
    }

    // slow
    deactivateNodesByEntityId(entityId: string): Node[] {
        return this.getAllNodes().filter((node: Node) => {
            return node.entityId === entityId;
        }).map((node: Node) => {
            this.destroySprite(node);
            node.isActive = false;
            return node;
        });
    }

    deactivateNodesByEntityIds(ids: string[]): void {
        ids.map(this.deactivateNodesByEntityId, this);
    }

    destroySprite(node: Node): void {
        if (node.display && node.display.sprite) {
            node.display.sprite.destroy();
        }
    }

    generateNodes(entityId: string, components: NodeComponents): void {

        if (components.display && components.position) {
            this.addNewNode(entityId, ClassType.RENDER, components);
        }

        if (components.animation && components.display && components.velocity) {
            this.addNewNode(entityId, ClassType.ANIMATION, components);
        }

        if (components.velocity && components.position && components.collision) {
            this.addNewNode(entityId, ClassType.MOVE, components);
        }

        if (components.velocity && components.input) {
            this.addNewNode(entityId, ClassType.CONTROL, components);
        }

        if (components.collision && components.display) {
            this.addNewNode(entityId, ClassType.COLLISION, components);
        }

        if (components.trigger) {
            this.addNewNode(entityId, ClassType.LEVEL, components);
        }
    }

    destructor() {

    }
}