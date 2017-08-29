import ISystem from './isystem';
import Node from '../nodes/node';
import Settings from '../settings';
import { ClassType } from '../enum';
import { TriggerType } from '../enum';

export default class MoveSystem implements ISystem {

    classType: ClassType;
    settings: Settings;

    constructor(settings) {

        this.classType = ClassType.MOVE;
        this.settings = settings;
    }

    init() { }

    stop() { }

    getVelocityX(time: number, friction: number, velocity: number, acceleration: number, isGrounded: boolean) {

        // limit horizontal movement in the air
        acceleration = isGrounded ? acceleration : acceleration/3;

        return (velocity + time * acceleration) * friction;
    }

    getPositionX(time: number, tile: number, position: number, velocity: number, mapWidth: number) {

        position = position + (velocity + time * velocity) * tile;

        // stop movement at map boundaries - shift this to collision system
        position = Math.max(0, position);
        position = this.getLowestHorizontalPosition(position, mapWidth, tile);

        return position;
    }

    getLowestHorizontalPosition(currentPosition: number, mapWidth: number, tileSize: number) {

        return Math.min(currentPosition, mapWidth * tileSize - tileSize);
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

    updateNode(node: Node, time: number) {

        let velocityData = node.velocity;

        let positionData = node.position;

        let collisionData = node.collision;

        let triggerData = node.trigger;

        let isGrounded = collisionData.isBottomObstacleCollision;

        let tile = this.settings.TILE;

        let friction = this.settings.FRICTION;


        let velocityX = this.getVelocityX(time, friction, velocityData.velocityX, velocityData.accelerationX, isGrounded);

        let positionX = this.getPositionX(time, tile, positionData.x, velocityData.velocityX, positionData.mapWidth);

        let velocityY = this.getVelocityY(time, velocityData.velocityY, velocityData.accelerationY, isGrounded);

        let positionY = this.getPositionY(time, tile, positionData.y, velocityData.velocityY, isGrounded);


        if (collisionData.isBottomObstacleCollision) {

            velocityY = Math.min(0, velocityY);
            velocityData.isGrounded = true;

        } else if (collisionData.isTopObstacleCollision) {

            velocityY = Math.max(0, velocityY);

        } else if (collisionData.isRightObstacleCollision) {

            velocityData.accelerationX = Math.min(0, velocityData.accelerationX);
            velocityX = Math.min(0, velocityX);

        } else if (collisionData.isLeftObstacleCollision) {

            velocityData.accelerationX = Math.max(0, velocityData.accelerationX);
            velocityX = Math.max(0, velocityX);
        }


        velocityData.velocityX = velocityX;

        positionData.x = positionX;

        velocityData.velocityY = velocityY;

        positionData.y = positionY;


        if (positionData.y > this.settings.MAP[0] * tile) {

            if (triggerData && triggerData.triggerType === TriggerType.PLAYERDEATH) {

                console.log('OFF MAP TRIGGER');

                triggerData.isTriggered = true;
            }
        }
    }

    update(time: number, nodes: Node[]) {

        nodes.map((node: Node) => { this.updateNode(node, time); });
    }
}