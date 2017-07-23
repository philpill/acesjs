import IComponent from '../components/icomponent';

export default class Entity {

    id: string;
    isActive: boolean;
    components: { [id: string] : IComponent; };

    constructor() {
        this.id = this._generateUUID();
        this.isActive = true;
        this.components = {};
    }

    private _generateUUID(): string {
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    addComponent(component: IComponent) {
        this.components[component.class] = component;
    }

    addComponents(...components: IComponent[]) {
        components.map(this.addComponent.bind(this));
    }

    removeComponent(componentClass: string) {
        this.components[componentClass].destroy();
        this.components[componentClass] = null;
    }

    destroy() {
        console.log('destroy');
        this.isActive = false;
        Object.keys(this.components).map((component) => {
            this.removeComponent(component);
        });
        this.components = {};
    }
}