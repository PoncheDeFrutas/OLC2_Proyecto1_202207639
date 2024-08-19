import { Literal } from '../ast/nodes.js';

/**
 * @param {string} op
 * @param {Literal} left
 * @param {Literal} right
 * @returns {Literal}
 * @throws {Error}
 */
export function LogicalOperation(op, left, right) {
    
    if (left.value === null || right.value === null) {
        throw new Error(`Cannot perform logical operation with null values.`);
    }
    
    if (left.type !== 'bool' || right.type !== 'bool') {
        throw new Error(`Invalid operand types: ${left.type} and ${right.type}. Both operands must be of type 'bool'.`);
    }

    switch (op) {
        case '&&':
            return new Literal({ value: left.value && right.value, type: 'bool' });
        case '||':
            return new Literal({ value: left.value || right.value, type: 'bool' });
        default:
            throw new Error(`Unsupported logical operator: ${op}`);
    }
}
