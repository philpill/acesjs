import ISystem from './isystem';
import Settings from '../settings';
import ITypedNode from '../itypedNode';
import { ClassType } from '../enum'

export default class MoveSystem implements ISystem {

    classType: ClassType;
    class: string;
    settings: Settings;

    constructor(settings) {

        this.classType = ClassType.MOVE;
        this.class = 'move';
        this.settings = settings;
    }

    init() { }

    stop() { }

    getVelocityX(time: number, friction: number, velocity: number, acceleration: number, isGrounded: boolean) {

        // limit horizontal movement in the air
        acceleration = isGrounded ? acceleration : acceleration/3;

        return (velocity + time * acceleration) * friction;
    }

    getPositionX(time: number, tile: number, position: number, velocity: number) {

        position = position + (velocity + time * velocity) * tile;

        // stop movement at map boundaries - shift this to collision system
        position = Math.max(0, position);
        position = Math.min(position, this.settings.MAP[0] * tile - tile);

        return position;
    }

    getVelocityY(time: number, velocity: number, acceleration: number, isGrounded: boolean) {

        // prevent any more downwards vertical movement
        velocity = isGrounded ? Math.max(0, velocity) : velocity + time * acceleration;

        // cap the velocity - anything more than 0.7 and the entity might fall
        // though the tile before collision is detected
        return Math.min(velocity, 0.5);
    }

    getPositionY(time: number, tile: number, position: number, velocity: number, isGrounded: boolean) {

        position = position + velocity * tile;

        if (isGrounded) {

            // round up to tile edge
            position = Math.floor(position / tile) * tile;
        }

        return Math.max(0, position);
    }

    update(time: number, nodes: ITypedNode[]) {

        nodes.map((node: ITypedNode) => {

            let velocityData = node.data.velocity;

            let positionData = node.data.position;

            let collisionData = node.data.collision;

            let isGrounded = collisionData.isBottomObstacleCollision;

            let tile = this.settings.TILE;

            let friction = this.settings.FRICTION;

            velocityData.velocityX = this.getVelocityX(time, friction, velocityData.velocityX, velocityData.accelerationX, isGrounded);

            positionData.x = this.getPositionX(time, tile, positionData.x, velocityData.velocityX);

            velocityData.velocityY = this.getVelocityY(time, velocityData.velocityY, velocityData.accelerationY, isGrounded);

            positionData.y = this.getPositionY(time, tile, positionData.y, velocityData.velocityY, isGrounded);

            if (positionData.y > this.settings.MAP[0] * tile) {
                console.log('OFF MAP');
                node.isActive = false;
            }
        });
    }
}