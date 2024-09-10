import {Environment} from "../ast/environment.js";

export class Instance {

    /**
     * @param {Struct|ArrayList} classInstance
     * @type {Environment|Array} properties
     */
    constructor(classInstance) {
        this.classInstance = classInstance;
        this.properties = new Environment(classInstance.closure);
    }

    set(name, value) {
        this.properties.assign(name, value);
    }

    get(name) {
        return this.properties.get(name);
    }
}