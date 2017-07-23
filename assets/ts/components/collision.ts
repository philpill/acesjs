import IComponent from './icomponent';

export default class CollisionComponent implements IComponent {

    class: string;

    type: string;

    collide: Function;

    isDamageCollision: boolean;
    isTriggerCollision: boolean;

    isTopObstacleCollision: boolean;
    isBottomObstacleCollision: boolean;
    isRightObstacleCollision: boolean;
    isLeftObstacleCollision: boolean;

    constructor(type: string) {

        this.class = 'collision';

        this.type = type;

        this.isDamageCollision = false;

        this.isTopObstacleCollision = false;
        this.isBottomObstacleCollision = false;
        this.isRightObstacleCollision = false;
        this.isLeftObstacleCollision = false;

        this.isTriggerCollision = false;

        this.collide = () => {

            // console.log('COLLIDE');
        }
    }

    destroy() {

        this.collide = () => {

        }
    }
}