import { Literal } from '../ast/nodes.js';
/**
 * @param {string} op
 * @param {Literal} left
 * @param {Literal} right
 * @returns {Literal}
 * @throws {Error}
 */

export function LogicalOperation(op, left, right) {
    if (left.type !== 'bool' || right.type !== 'bool') {
        throw new Error(`Operands types are not valid ${left.type} y ${right.type}`);
    }

    let result;
    switch (op) {
        case '&&':
            result = left.value && right.value;
            break;
        case '||':
            result = left.value || right.value;
            break;
        default:
            throw new Error(`Operator ${op} not implemented`);
    }

    return new Literal({ value: result, type: 'bool' });
}