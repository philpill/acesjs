export default class AnimationSystem {

    constructor(settings) {

        this.class = 'animation';
        this.settings = settings;
        this.timer = 0;
    }

    init() {

    }

    setAnimation(node, prop) {

        node.data.animation.currentAnimationProp = prop;
    }

    updateFrame(node) {

        let animationData = node.data.animation;

        let displayData = node.data.display;

        let frames = animationData[node.data.animation.currentAnimationProp];

        if (animationData.currentFrame + 1 >= frames.length) {

            animationData.currentFrame = 0;

        } else {

            animationData.currentFrame++;
        }

        displayData.sprite.texture.frame = displayData.sprite.data.texture[frames[animationData.currentFrame]];
    }

    update(dt, nodes) {

        nodes.map((node) => {

            let velocityData = node.data.velocity;

            let animationData = node.data.animation;

            if (velocityData.velocityY > 0.01 || velocityData.velocityY < -0.01) {

                // play jump animation
                this.setAnimation(node, 'jump');

            } else if (velocityData.velocityX > 0.1) {

                //play right animation
                this.setAnimation(node, 'walkRight');

            } else if (velocityData.velocityX < -0.1) {

                //play left animation
                this.setAnimation(node, 'walkLeft');

            } else {

                this.setAnimation(node, 'default');
            }

            this.timer = this.timer + dt;

            if (this.timer > 0.2) {

                this.updateFrame(node);

                this.timer = dt;
            }
        });
    }
}