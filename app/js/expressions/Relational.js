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
    const accepted = rules.find(([tl, tr]) => tl === left.type && tr === right.type);

    if (!accepted) {
        throw new Error(`Invalid operand types: ${left.type} and ${right.type}`);
    }

    const resultType = accepted[2];

    const operations = {
        '<': (a, b) => a < b,
        '>': (a, b) => a > b,
        '<=': (a, b) => a <= b,
        '>=': (a, b) => a >= b,
        '==': (a, b) => a === b,
        '!=': (a, b) => a !== b,
    };

    if (!(op in operations)) {
        throw new Error(`Operator ${op} not implemented`);
    }

    const result = operations[op](left.value, right.value);
    return new Literal({ value: result, type: resultType });
}

function createCommonRules() {
    return [
        ['int', 'int', 'bool'],
        ['int', 'float', 'bool'],
        ['float', 'int', 'bool'],
        ['float', 'float', 'bool'],
        ['char', 'char', 'bool']
    ];
}

const OperationRules = {
    '<': createCommonRules(),
    '>': createCommonRules(),
    '<=': createCommonRules(),
    '>=': createCommonRules(),
    '==': [
        ...createCommonRules(),
        ['string', 'string', 'bool'],
        ['bool', 'bool', 'bool'],
    ],
    '!=': [
        ...createCommonRules(),
        ['string', 'string', 'bool'],
        ['bool', 'bool', 'bool'],
    ],
};
