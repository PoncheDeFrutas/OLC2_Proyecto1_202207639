import {Literal} from "../ast/nodes.js";
import {ArrayListInstance} from "./StructInstance.js";

export function cloneLiteral(literal) {
    if (!(literal instanceof Literal)) {
        throw new Error('Expected instance of Literal');
    }

    let clonedValue;

    if (Array.isArray(literal.value)) {
        clonedValue = literal.value.map(item => cloneValue(item));
    } else {
        clonedValue = cloneValue(literal.value);
    }

    return new Literal({ value: clonedValue, type: literal.type });
}

function cloneValue(value) {
    if (value instanceof Literal) {
        return cloneLiteral(value);
    } else if (value instanceof ArrayListInstance) {
        return cloneArrayListInstance(value);
    } else if (Array.isArray(value)) {
        return value.map(item => cloneValue(item));
    } else {
        return JSON.parse(JSON.stringify(value));
    }
}

function cloneArrayListInstance(arrayListInstance) {
    if (!(arrayListInstance instanceof ArrayListInstance)) {
        throw new Error('Expected instance of ArrayListInstance');
    }

    const clonedProperties = arrayListInstance.properties.map(prop => cloneValue(prop));

    return new ArrayListInstance(arrayListInstance.classInstance, clonedProperties);
}
