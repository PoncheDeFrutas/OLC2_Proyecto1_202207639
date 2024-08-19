import { Literal } from "../ast/nodes.js";

/**
 * @param {string} type
 * @param {string} name
 * @param {Literal|null} value
 */

export function VarDeclaration(type, name, value) {
    if (value === null) {
        
        if (type === 'var') {
            throw new Error(`Variable declaration must have a value.`);
        }

        return new Literal({ value: null, type });
    }

    if (type === 'float' && value.type === 'int') {
        return new Literal({ value: parseFloat(value.value), type: 'float' });
    }

    if (type === 'var' || type === value.type) {
        return value;
    }
    
    return new Literal({ value: null, type });
}