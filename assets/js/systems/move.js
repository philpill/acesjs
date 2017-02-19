export default class MoveSystem {

    constructor(settings) {

        this.class = 'move';
        this.settings = settings;
    }

    init() {

    }

    update(time, nodes) {

        nodes.map((node) => {

            let velocityData = node.data.velocity;

            let positionData = node.data.position;

            if (!velocityData.isGrounded) {
                // limit horizontal movement in the air
                velocityData.accelerationX = velocityData.accelerationX/3;
            }

            velocityData.velocityX = (velocityData.velocityX + time * velocityData.accelerationX) * this.settings.FRICTION;

            if (velocityData.isGrounded) {
                    // prevent any more downwards vertical movement
                    velocityData.velocityY = Math.max(0, velocityData.velocityY);
                    // round up to tile edge
                    positionData.y = Math.floor(positionData.y/this.settings.TILE)*this.settings.TILE;

            } else {

                velocityData.velocityY = (velocityData.velocityY + time * velocityData.accelerationY);
            }

            positionData.x += (velocityData.velocityX + time * velocityData.velocityX) * this.settings.TILE;

            // stop movement at map boundaries - shift this to collision system
            positionData.x = Math.max(0, positionData.x);
            positionData.x = Math.min(positionData.x, this.settings.MAP[0]*this.settings.TILE - this.settings.TILE);

            // cap the velocity - anything more than 0.7 and the entity might fall
            // though the tile before collision is detected
            let velocityY = Math.min(velocityData.velocityY + time * velocityData.velocityY, 0.5);

            positionData.y += velocityY * this.settings.TILE;

            positionData.y = Math.max(0, positionData.y);

        });
    }
}