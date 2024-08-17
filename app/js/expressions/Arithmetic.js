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

    const accepted = rules.find(([tl, tr]) =>
        tl === left.type && tr === right.type
    )
    if (!accepted) {
        throw new Error(`Operands types are not valid' ${left.type} y ${right.type}`);
    }
    
    const [_, __, resultType] = accepted;

    if ((op === '/'  || op ==='%')&& right.value === 0) {
        console.warn("Division by zero detected. Result is null.");
        return new Literal({value: null, type: resultType});
    }

    let result

    switch (op) {
        case '+':
            result = left.value + right.value
            break
        case '-':
            result = left.value - right.value
            break
        case '*':
            result = left.value * right.value
            break
        case '/':
            result = left.value / right.value
            break
        case '%':
            result = left.value % right.value
            break
        default:
            throw new Error(`Operator ${op} not implemented`);
    }

    return new Literal({value: result, type: resultType});
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
    '%': [
        ['int', 'int', 'int']
    ]
};
