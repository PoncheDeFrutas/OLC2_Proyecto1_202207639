/**
 * @typedef {Object} Location
 * @property {Object} start
 * @property {number} start.offset
 * @property {number} start.line
 * @property {number} start.column
 * @property {Object} end
 * @property {number} end.offset
 * @property {number} end.line
 * @property {number} end.column
 */


/**
 * @typedef {import('./visitor').BaseVisitor} BaseVisitor
 */

export class Expression {

    constructor() {


        /**
         * The location of the node in the source code.
         * @type {Location|null}
         */
        this.location = null;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpression(this);
    }
}

export class ArithmeticOperation extends Expression {

    /**
     * @param {Object} options
     * @param {string} options.op The operator of the binary operation.
     * @param {Expression} options.le The left operand of the binary operation.
     * @param {Expression} options.ri The right operand of the binary operation.
     */
    constructor({op, le, ri}) {
        super();

        /**
         * The operator of the binary operation.
         * @type {string}
         */
        this.op = op;


        /**
         * The left operand of the binary operation.
         * @type {Expression}
         */
        this.le = le;


        /**
         * The right operand of the binary operation.
         * @type {Expression}
         */
        this.ri = ri;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitArithmeticOperation(this);
    }
}

export class RelationalOperation extends Expression {

    /**
     * @param {Object} options
     * @param {string} options.op The operator of the binary operation.
     * @param {Expression} options.le The left operand of the binary operation.
     * @param {Expression} options.ri The right operand of the binary operation.
     */
    constructor({op, le, ri}) {
        super();

        /**
         * The operator of the binary operation.
         * @type {string}
         */
        this.op = op;


        /**
         * The left operand of the binary operation.
         * @type {Expression}
         */
        this.le = le;


        /**
         * The right operand of the binary operation.
         * @type {Expression}
         */
        this.ri = ri;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitRelationalOperation(this);
    }
}

export class LogicalOperation extends Expression {

    /**
     * @param {Object} options
     * @param {string} options.op The operator of the binary operation.
     * @param {Expression} options.le The left operand of the binary operation.
     * @param {Expression} options.ri The right operand of the binary operation.
     */
    constructor({op, le, ri}) {
        super();

        /**
         * The operator of the binary operation.
         * @type {string}
         */
        this.op = op;


        /**
         * The left operand of the binary operation.
         * @type {Expression}
         */
        this.le = le;


        /**
         * The right operand of the binary operation.
         * @type {Expression}
         */
        this.ri = ri;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitLogicalOperation(this);
    }
}

export class UnaryOperation extends Expression {

    /**
     * @param {Object} options
     * @param {string} options.op The operator of the unary operation.
     * @param {Expression} options.exp The operand of the unary operation.
     */
    constructor({op, exp}) {
        super();

        /**
         * The operator of the unary operation.
         * @type {string}
         */
        this.op = op;


        /**
         * The operand of the unary operation.
         * @type {Expression}
         */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitUnaryOperation(this);
    }
}

export class Group extends Expression {

    /**
     * @param {Object} options
     * @param {Expression} options.exp The expression inside the group.
     */
    constructor({exp}) {
        super();

        /**
         * The expression inside the group.
         * @type {Expression}
         */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitGroup(this);
    }
}

export class Identifier extends Expression {

    /**
     * @param {Object} options
     * @param {string} options.name The name of the identifier.
     */
    constructor({name}) {
        super();

        /**
         * The name of the identifier.
         * @type {string}
         */
        this.name = name;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitIdentifier(this);
    }
}

export class Literal extends Expression {

    /**
     * @param {Object} options
     * @param {any} options.value The value of the literal.
     * @param {string} options.type The type of the literal.
     */
    constructor({value, type}) {
        super();

        /**
         * The value of the literal.
         * @type {any}
         */
        this.value = value;


        /**
         * The type of the literal.
         * @type {string}
         */
        this.type = type;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitLiteral(this);
    }
}

export default {
    Expression,
    ArithmeticOperation,
    RelationalOperation,
    LogicalOperation,
    UnaryOperation,
    Group,
    Identifier,
    Literal
}
