import MoveNode from './nodes/move';
import RenderNode from './nodes/render';
import ControlNode from './nodes/control';
import CollisionNode from './nodes/collision';
import AnimationNode from './nodes/animation';

export default class Engine {

    constructor() {

        this.entities = [];
        this.systems = [];
        this.nodes = [];
        this.isPaused = false;
    }

    init() {

        this.update();
    }

    addEntity(entity) {

        this.entities.push(entity);

        if (entity.display && entity.position) {

            this.nodes.push({ entityId: entity.id, class: 'render', data: new RenderNode(entity.id, entity.display, entity.position) });
        }

        if (entity.animation && entity.display && entity.velocity) {

            this.nodes.push({ entityId: entity.id, class: 'animation', data: new AnimationNode(entity.id, entity.animation, entity.display, entity.velocity) });
        }

        if (entity.velocity && entity.position) {

            this.nodes.push({ entityId: entity.id, class: 'move', data: new MoveNode(entity.id, entity.position, entity.velocity) });
        }

        if (entity.velocity && entity.input) {

            this.nodes.push({ entityId: entity.id, class: 'control', data: new ControlNode(entity.id, entity.control, entity.velocity) });
        }

        if (entity.collision) {

            this.nodes.push({ entityId: entity.id, class: 'collision', data: new CollisionNode(entity.id, entity.collision, entity.display, entity.velocity) });
        }
    }

    removeEntity(entity) {

        let entityId = entity.id;

        let index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities[index] = null;
            this.entities.splice(index, 1);
        }

        var i = this.nodes.length;

        while (i--) {
            if (this.nodes[i].entityId === entityId) {
                this.nodes[i] = null;
                this.nodes.splice(i, 1);
            }
        }
    }

    addSystem(system) {

        this.systems.push(system);

        system.init();
    }

    removeSystem(system) {

        let index = this.systems.indexOf(system);

        if (index > -1) {
            system.stop();
            this.systems.splice(index, 1);
        }
    }

    getNodes(nodeClass) {

        let nodes = [];

        for (var i = 0, j = this.nodes.length; i < j; i++) {

            if (this.nodes[i].class === nodeClass) {
                nodes.push(this.nodes[i]);
            }
        }

        return nodes;
    }

    update(before = 0) {

        this.isPaused = false;

        // console.log(document.visibilityState);

        if (document.visibilityState !== 'visible') {

            this.isPaused = true;
        }

        let now = performance.now();

            // console.log(now);

            // console.log(before);

        let dt = (now - before)/1000;

        dt = Math.min(dt, 0.1); // magic number to prevent massive dt when tab not active

        for (var i = 0, j = this.systems.length; i < j; i++) {

            // console.log(dt);

            if (!this.isPaused) {

                this.systems[i].update(dt, this.getNodes(this.systems[i].class));
            }
        }

        before = now;

        requestAnimationFrame(this.update.bind(this, before));
    }
}
