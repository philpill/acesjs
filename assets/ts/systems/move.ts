import ISystem from './isystem';
import Settings from '../settings';
import INode from '../nodes/inode';
import ITypedNode from '../itypedNode';
import VelocityComponent from '../components/velocity';
import CollisionComponent from '../components/collision';
import PositionComponent from '../components/position';


export default class MoveSystem implements ISystem {

    class: string;
    settings: Settings;

    constructor(settings) {

        this.class = 'move';
        this.settings = settings;
    }

    init() {

    }

    stop() {

    }

    getVelocityX(time: number, velocityData: VelocityComponent, collisionData: CollisionComponent) {

        let velocity = velocityData.velocityX;

        if (!collisionData.isBottomObstacleCollision) {
            // limit horizontal movement in the air
            velocityData.accelerationX = velocityData.accelerationX/3;
        }

        velocity = (velocityData.velocityX + time * velocityData.accelerationX) * this.settings.FRICTION;

        return velocity;
    }

    getPositionX(time: number, positionData: PositionComponent, velocityData: VelocityComponent) {

        let position = positionData.x;


        position += (velocityData.velocityX + time * velocityData.velocityX) * this.settings.TILE;

        // stop movement at map boundaries - shift this to collision system
        position = Math.max(0, position);
        position = Math.min(position, this.settings.MAP[0]*this.settings.TILE - this.settings.TILE);

        return position;
    }

    update(time: number, nodes: ITypedNode[]) {

        nodes.map((node: ITypedNode) => {

            let velocityData = node.data.velocity;

            let positionData = node.data.position;

            let collisionData = node.data.collision;

            velocityData.velocityX = this.getVelocityX(time, velocityData, collisionData);

            positionData.x = this.getPositionX(time, positionData, velocityData);




            if (collisionData.isBottomObstacleCollision) {

                // prevent any more downwards vertical movement
                velocityData.velocityY = Math.max(0, velocityData.velocityY);
                            // round up to tile edge
                positionData.y = Math.floor(positionData.y/this.settings.TILE)*this.settings.TILE;

            } else {

                velocityData.velocityY = (velocityData.velocityY + time * velocityData.accelerationY);
            }


            // cap the velocity - anything more than 0.7 and the entity might fall
            // though the tile before collision is detected
            let velocityY = Math.min(velocityData.velocityY + time * velocityData.velocityY, 0.5);

            positionData.y += velocityY * this.settings.TILE;

            if (collisionData.isBottomObstacleCollision) {

                // round up to tile edge
                positionData.y = Math.floor(positionData.y/this.settings.TILE)*this.settings.TILE;
            }

            positionData.y = Math.max(0, positionData.y);

            if (positionData.y > this.settings.MAP[0]*this.settings.TILE) {
                console.log('OFF MAP');
                node.isActive = false;
            }
        });
    }
}