import Animation from '../components/animation';
import Collision from '../components/collision';
import Display from '../components/display';
import Health from '../components/health';
import Input from '../components/input';
import Position from '../components/position';
import Trigger from '../components/trigger';
import User from '../components/user';
import Velocity from '../components/velocity';

interface INode {

    entityId: number;


    animation?: Animation;
    collision?: Collision;
    display?: Display;
    health?: Health;
    input?: Input;
    position?: Position;
    trigger?: Trigger;
    user?: User;
    velocity?: Velocity;

    class?: string;

    isActive: boolean;
}

export default INode;