
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

export class Expression  {

    /**
    * @param {Object} options
    * @param {Location|null} options.location The location of the node in the source code.
    */
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
    constructor({ op, le, ri }) {
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
    constructor({ op, le, ri }) {
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
    constructor({ op, le, ri }) {
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
    constructor({ op, exp }) {
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
    constructor({ exp }) {
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
    
export class Literal extends Expression {

    /**
    * @param {Object} options
    * @param {any} options.value The value of the literal.
 * @param {string} options.type The type of the literal.
    */
    constructor({ value, type }) {
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
    
export class VariableDeclaration extends Expression {

    /**
    * @param {Object} options
    * @param {string} options.type The type of the variable declaration.
 * @param {string} options.id The identifier of the variable.
 * @param {Expression} options.value The initial value of the variable.
    */
    constructor({ type, id, value }) {
        super();
        
        /**
         * The type of the variable declaration.
         * @type {string}
        */
        this.type = type;


        /**
         * The identifier of the variable.
         * @type {string}
        */
        this.id = id;


        /**
         * The initial value of the variable.
         * @type {Expression}
        */
        this.value = value;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitVariableDeclaration(this);
    }
}
    
export class VariableValue extends Expression {

    /**
    * @param {Object} options
    * @param {string} options.id The name of the identifier.
    */
    constructor({ id }) {
        super();
        
        /**
         * The name of the identifier.
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitVariableValue(this);
    }
}
    
export class Print extends Expression {

    /**
    * @param {Object} options
    * @param {Expression} options.exp The expression to print.
    */
    constructor({ exp }) {
        super();
        
        /**
         * The expression to print.
         * @type {Expression}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitPrint(this);
    }
}
    
export class Assignment extends Expression {

    /**
    * @param {Object} options
    * @param {string} options.id The identifier of the assignment.
 * @param {string} options.sig The value of the assignment.
 * @param {Expression} options.assign The value of the assignment.
    */
    constructor({ id, sig, assign }) {
        super();
        
        /**
         * The identifier of the assignment.
         * @type {string}
        */
        this.id = id;


        /**
         * The value of the assignment.
         * @type {string}
        */
        this.sig = sig;


        /**
         * The value of the assignment.
         * @type {Expression}
        */
        this.assign = assign;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAssignment(this);
    }
}
    
export class ExpressionStatement extends Expression {

    /**
    * @param {Object} options
    * @param {Expression} options.exp The expression of the statement.
    */
    constructor({ exp }) {
        super();
        
        /**
         * The expression of the statement.
         * @type {Expression}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpressionStatement(this);
    }
}
    
export class TernaryOperation extends Expression {

    /**
    * @param {Object} options
    * @param {Expression} options.cond The condition of the ternary operation.
 * @param {Expression} options.trueExp The expression if the condition is true.
 * @param {Expression} options.falseExp The expression if the condition is false.
    */
    constructor({ cond, trueExp, falseExp }) {
        super();
        
        /**
         * The condition of the ternary operation.
         * @type {Expression}
        */
        this.cond = cond;


        /**
         * The expression if the condition is true.
         * @type {Expression}
        */
        this.trueExp = trueExp;


        /**
         * The expression if the condition is false.
         * @type {Expression}
        */
        this.falseExp = falseExp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitTernaryOperation(this);
    }
}
    
export class Block extends Expression {

    /**
    * @param {Object} options
    * @param {Expression[]} options.statements The expression of the block.
    */
    constructor({ statements }) {
        super();
        
        /**
         * The expression of the block.
         * @type {Expression[]}
        */
        this.statements = statements;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBlock(this);
    }
}
    
export default { Expression, ArithmeticOperation, RelationalOperation, LogicalOperation, UnaryOperation, Group, Literal, VariableDeclaration, VariableValue, Print, Assignment, ExpressionStatement, TernaryOperation, Block }
