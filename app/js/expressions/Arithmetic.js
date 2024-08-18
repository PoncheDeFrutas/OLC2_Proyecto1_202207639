import { Literal } from "../ast/nodes.js";

/**
 * @param {string} op
 * @param {Literal} left
 * @param {Literal} right
 * @returns {Literal}
 * @throws {Error}
 */
export function ArithmeticOperation(op, left, right) {
    const rules = OperationRules[op];

    const accepted = rules.find(([tl, tr]) => tl === left.type && tr === right.type);

    if (!accepted) {
        throw new Error(`Operand types are not valid: ${left.type} and ${right.type}`);
    }

    const resultType = accepted[2];

    if ((op === '/' || op === '%') && right.value === 0) {
        console.warn("Division by zero detected. Result is null.");
        return new Literal({ value: null, type: 'null' });
    }

    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '%': (a, b) => a % b,
    };

    if (!(op in operations)) {
        throw new Error(`Operator ${op} not implemented`);
    }

    const result = operations[op](left.value, right.value);
    return new Literal({ value: result, type: resultType });
}

function createCommonRules() {
    return [
        ['int', 'int', 'int'],
        ['int', 'float', 'float'],
        ['float', 'int', 'float'],
        ['float', 'float', 'float']
    ];
}

const OperationRules = {
    '+': [...createCommonRules(), ['string', 'string', 'string']],
    '-': createCommonRules(),
    '*': createCommonRules(),
    '/': createCommonRules(),
    '%': [['int', 'int', 'int']]
};
