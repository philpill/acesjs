import ISystem from './isystem';
import Settings from '../settings';
import Node from '../nodes/node';
import { ClassType } from '../enum'
import { Howl } from 'howler';

export default class SoundSystem implements ISystem {

    classType: ClassType;
    settings: Settings;

    constructor(settings: Settings) {

        this.classType = ClassType.SOUND;
        this.settings = settings;

        var sound = new Howl({
            src: ['/static/wav/NFF-micro-jump.wav'],
            autoplay: true,
            volume: 0.1,
            onend: function() {
                console.log('Finished!');
            }
        });
    }

    init() {

    }

    stop() {

    }

    update(time: number, nodes: Node[]) {

        nodes.map((node: Node) => {

        });
    }
}