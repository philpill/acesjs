import ISystem from './isystem';
import Node from '../nodes/node';
import Settings from '../settings';
import { ClassType } from '../enum';
import { TriggerType } from '../enum';
import Resolver from '../collisionResolver';

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
        position = Math.min(position, mapWidth * tile - tile);

        return position;
    }

    getVelocityY(time: number, velocity: number, acceleration: number, isGrounded: boolean) {

        velocity = velocity + time * acceleration;

        return velocity;
    }

    getPositionY(time: number, tile: number, position: number, velocity: number, isGrounded: boolean) {

        // console.log('velocity ', velocity);

        // console.log('position1', position);

        position = position + (velocity * tile);

        // console.log('position', position);

        return Math.max(0, position);
    }

    updateNode(node: Node, time: number) {

        let velocityData = node.velocity;

        let positionData = node.position;

        let collisionData = node.collision;

        let triggerData = node.trigger;

        let isGrounded = velocityData.isGrounded;

        let tile = this.settings.TILE;

        let friction = this.settings.FRICTION;

        let velocityX = this.getVelocityX(time, friction, velocityData.velocityX, velocityData.accelerationX, isGrounded);

        let positionX = this.getPositionX(time, tile, positionData.x, velocityData.velocityX, positionData.mapWidth);

        let velocityY = this.getVelocityY(time, velocityData.velocityY, velocityData.accelerationY, isGrounded);

        let positionY = this.getPositionY(time, tile, positionData.y, velocityData.velocityY, isGrounded);

        // cap the velocity - anything more than 0.3 and the entity might fall
        // though the tile before collision is detected
        //  bullet-through-paper
        velocityY = Math.min(velocityY, 0.2);


        if (collisionData.isBottomObstacleCollision) {

            // prevent any more downwards vertical movement
            // velocityY = Math.min(0, velocityY);
            // velocityData.accelerationY = Math.min(0, velocityData.accelerationY);

            // penetration resolution
            positionY = (Math.round(positionY / tile) * tile);
        }

         if (collisionData.isTopObstacleCollision) {

            velocityY = Math.max(0, velocityY);

            // penetration resolution
            // something
        }

         if (collisionData.isRightObstacleCollision) {

            velocityData.accelerationX = Math.min(0, velocityData.accelerationX);
            velocityX = Math.min(0, velocityX);

            // penetration resolution
            positionX = (Math.round(positionX / tile) * tile) - 1;
        }

         if (collisionData.isLeftObstacleCollision) {

            velocityData.accelerationX = Math.max(0, velocityData.accelerationX);
            velocityX = Math.max(0, velocityX);

            // penetration resolution
            positionX = (Math.round(positionX / tile) * tile) + 1;
        }

        // let resolver = new Resolver();

        // check bounding box collision here
        // positionData.x = positionX;
        // positionData.y = positionY;

        positionData.expectedX = positionX;
        positionData.expectedY = positionY;

        velocityData.velocityX = velocityX;
        velocityData.velocityY = velocityY;

        // console.log(velocityY);
        // console.log(positionData.expectedY);

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