import {Literal} from "../ast/nodes.js";

/**
 * @param {string}op
 * @param {Literal}ext
 * @returns {Literal}
 * @throws {Error}
 */
export function UnaryOperation(op, ext) {
    
    if (ext.value === null) {
        throw new Error(`Cannot perform unary operation with null value.`);
    }
    
    const unaryOperations = {
        '-': value => {
            if (ext.type !== 'int' && ext.type !== 'float') {
                throw new Error(`Invalid unary operator '-' for type '${ext.type}'`);
            }
            return new Literal({ type: ext.type, value: -value });
        },
        '!': value => {
            if (ext.type !== 'bool') {
                throw new Error(`Invalid unary operator '!' for type '${ext.type}'`);
            }
            return new Literal({ type: 'bool', value: !value });
        }
    };

    if (!(op in unaryOperations)) {
        throw new Error(`Invalid unary operator '${op}'`);
    }

    return unaryOperations[op](ext.value);
}