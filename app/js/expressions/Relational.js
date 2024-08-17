import { Literal } from '../ast/nodes.js';
/**
 * @param {string} op
 * @param {Literal} left
 * @param {Literal} right
 * @returns {Literal}
 * @throws {Error}
 */

export function RelationalOperation(op, left, right) {
    const rules = OperationRules[op];

    const accepted = rules.find(([tl, tr]) =>
        tl === left.type && tr === right.type
    )

    if (!accepted) {
        throw new Error(`Operands types are not valid' ${left.type} y ${right.type}`);
    }

    const [_, __, resultType] = accepted;

    let result

    switch (op) {
        case '<':
            result = left.value < right.value
            break
        case '>':
            result = left.value > right.value
            break
        case '<=':
            result = left.value <= right.value
            break
        case '>=':
            result = left.value >= right.value
            break
        case '==':
            result = left.value === right.value
            break
        case '!=':
            result = left.value !== right.value
            break
        default:
            throw new Error(`Operator ${op} not implemented`);
    }

    return new Literal({ value: result, type: resultType });
}

function createCommonRules() {
    return [
        ['int', 'int', 'bool'],
        ['int', 'float', 'bool'],
        ['float', 'int', 'bool'],
        ['float', 'float', 'bool'],
        ['char', 'char', 'bool']
    ]
}

const OperationRules = {
    '<': createCommonRules(),
    '>': createCommonRules(),
    '<=': createCommonRules(),
    '>=': createCommonRules(),
    '==': [...createCommonRules(),['string', 'string', 'bool'],
        ['bool', 'bool', 'bool'],],
    '!=': [...createCommonRules(),['string', 'string', 'bool'],
        ['bool', 'bool', 'bool'],],
}