import IComponent from './icomponent';

export default class CollisionComponent implements IComponent {

    class: string;
    type: string;
    collide: Function;

    constructor() {

        this.class = 'collision';

        this.type = '';

        this.collide = () => {

            // console.log('COLLIDE');
        }
    }
}