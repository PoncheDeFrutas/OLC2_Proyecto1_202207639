import { Literal } from "./nodes.js";


export class Environment {

    /**
     * @param {Environment} parent
     */
    constructor(parent = null) {
        this.name = '';
        this.prev = parent;
        this.table = {};
    }

    /**
     * @param {string} name
     * @param {Literal} value
     */
    setVariable(name, value) {
        if (this.table[name]) {
            throw new Error(`Variable ${name} already exists`);
        }
        this.table[name] = value;
        if (value.value === null) {
            throw new Error(`Variable ${name} must have a value.`);
        }
    }
    
    /**
     * @param {string} name
     * @param {Literal} value
     */
    setVariableValue(name, value) {
        if (this.table[name]) {
            if (this.table[name].type !== value.type) {
                this.table[name].value = null
                return null
            }
            this.table[name] = value
            return null
        }
        
        if (this.prev) {
            return this.prev.setVariableValue(name, value);
        }

        throw new Error(`Variable ${name} not found`);
    }

    /**
     * @param {string} name
     * @returns {Literal}
     */
    getVariable(name) {
        if (this.table[name]) {
            return this.table[name];
        }
        if (this.prev) {
            return this.prev.getVariable(name);
        }
        throw new Error(`Variable ${name} not found`);
    }
}