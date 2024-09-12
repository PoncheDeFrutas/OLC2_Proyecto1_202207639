import {AbstractInstance} from "./AbstractInstance.js";
import {Environment} from "../ast/environment.js";
import {Struct} from "./Struct.js";
import {ArrayList} from "./ArrayList.js";
import {Literal} from "../ast/nodes.js";

export class StructInstance extends AbstractInstance {
    /**
     * @param {Struct} classInstance
     * @param {Environment} environment
     */
    constructor(classInstance, environment) {
        super(classInstance, new Environment(environment));
    }

    /**
     * @override
     * @param {string} name
     * @param {*} value
     * @returns {void}
     */
    set(name, value) {
        this.properties.assign(name, value);
    }

    /**
     * @override
     * @param {string} name
     * @returns {*}
     */
    get(name) {
        return this.properties.get(name);
    }

    /**
     * Create a deep copy of the StructInstance.
     * @returns {StructInstance}
     */
    clone() {
        super.clone()
    }
}

export class ArrayListInstance extends AbstractInstance {
    /**
     * @param {ArrayList} classInstance
     * @param {Literal} arrayList
     */
    constructor(classInstance, arrayList) {
        super(classInstance, arrayList);
    }

    /**
     * @override
     * @param {Literal} index - The index of the property in the ArrayList.
     * @param {*} value - The value to set.
     */
    set(index, value) {
        if (!(index instanceof Literal)) {
            throw new Error('Index out of bounds');
        }
        if (index.type !== 'int') {
            throw new Error('Index must be a number');
        }
        if (index.value < 0 || index.value >= this.properties.length) {
            throw new Error('Index out of bounds');
        }
        this.properties[index.value] = value;
    }

    /**
     * @override
     * @param {Literal} index - The index of the property in the ArrayList.
     * @returns {*} The value of the property.
     */
    get(index) {
        if (!(index instanceof Literal)) {
            throw new Error('Index out of bounds');
        }
        if (index.type !== 'int') {
            throw new Error('Index must be a number');
        }
        if (index.value < 0 || index.value >= this.properties.length) {
            throw new Error('Index out of bounds');
        }

        return this.properties[index.value];
    }

    /**
     * Create a deep copy of the ArrayListInstance.
     * @returns {ArrayListInstance}
     */
    clone() {
    }
}
