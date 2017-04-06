export default class CollisionComponent {

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