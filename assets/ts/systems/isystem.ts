import { ClassType } from '../enum'

interface ISystem {

    class: string;

    stop: Function;

    init: Function;

    classType: ClassType;
}

export default ISystem;