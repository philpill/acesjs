import { ClassType } from '../enum'

interface ISystem {

    stop: Function;

    init: Function;

    classType: ClassType;

    update: Function;
}

export default ISystem;