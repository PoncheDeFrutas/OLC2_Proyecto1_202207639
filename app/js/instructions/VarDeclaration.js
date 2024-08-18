import { Literal } from "../ast/nodes.js";

/**
 * @param {string} type
 * @param {string} name
 * @param {Literal|null} value
 */

export function VarDeclaration(type, name, value) {
    if (value === null) {
        const defaultValues = {
            'int': 0,
            'float': 0.0,
            'bool': true,
            'string': '',
            'char': '',
            'struct': null
        };

        if (type === 'var') {
            throw new Error(`Variable declaration must have a value.`);
        }

        if (defaultValues.hasOwnProperty(type)) {
            return new Literal({ value: defaultValues[type], type });
        }
        throw new Error(`Invalid type '${type}'`);
    }

    if (type === 'float' && value.type === 'int') {
        return new Literal({ value: parseFloat(value.value), type: 'float' });
    }

    if (type === 'var' || type === value.type) {
        return value;
    }
    throw new Error(`Variable type '${type}' does not match value type '${value.type}'`);
}