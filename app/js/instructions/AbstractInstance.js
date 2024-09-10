import {Environment} from "../ast/environment.js";
import {Struct} from "./Struct.js";
import {ArrayList} from "./ArrayList.js";

export class AbstractInstance {
    /**
     * @param {Struct | ArrayList} classInstance
     * @param {Environment | Literal} properties
     */
    constructor(classInstance, properties) {
        if (new.target === AbstractInstance) {
            throw new Error(`Cannot instantiate an abstract class.`);
        }
        this.classInstance = classInstance;
        this.properties = properties
    }

    /**
     * @abstract
     * @param {string | number} name
     * @param {*} value
     * @returns {void}
     */
    set(name, value) {
        throw new Error(`Abstract method set not implemented.`);
    }

    /**
     * @abstract
     * @param {string | number} name
     * @returns {*}
     */
    get(name) {
        throw new Error(`Abstract method get not implemented.`);
    }

    /**
     * Create a deep copy of the AbstractInstance.
     * @returns {AbstractInstance}
     */
    clone() {
        throw new Error(`Abstract method clone not implemented.`);
    }
}
