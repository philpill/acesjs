export default class Entity {

    constructor() {

        this.id = this.generateUUID();
        this.isActive = true;
        this.components = {};
    }

    generateUUID() {
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function"){
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    addComponent(component) {

        this.components[component.class] = component;
    }

    addComponents(...components) {
        components.map((component) => {
            this.components[component.class] = component;
        });
    }

    removeComponent(componentClass) {

        this.components[componentClass] = null;
    }

    destroy() {
        console.log('destroy');
    }
}