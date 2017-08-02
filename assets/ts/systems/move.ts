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

        velocityData.velocityX = this.getVelocityX(time, friction, velocityData.velocityX, velocityData.accelerationX, isGrounded);

        positionData.x = this.getPositionX(time, tile, positionData.x, velocityData.velocityX, positionData.mapWidth);

        velocityData.velocityY = this.getVelocityY(time, velocityData.velocityY, velocityData.accelerationY, isGrounded);

        positionData.y = this.getPositionY(time, tile, positionData.y, velocityData.velocityY, isGrounded);

        if (positionData.y > this.settings.MAP[0] * tile) {

            positionData.outOfBounds = true;

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