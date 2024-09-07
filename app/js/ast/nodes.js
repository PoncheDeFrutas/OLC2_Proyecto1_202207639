
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
    
export class VarValue extends Expression {

    /**
    * @param {Object} options
    * @param {string} options.id The name of the variable.
    */
    constructor({ id }) {
        super();
        
        /**
         * The name of the variable.
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitVarValue(this);
    }
}
    
export class Unary extends Expression {

    /**
    * @param {Object} options
    * @param {string} options.op The operator of the unary expression.
 * @param {Expression} options.exp The right expression of the unary expression.
    */
    constructor({ op, exp }) {
        super();
        
        /**
         * The operator of the unary expression.
         * @type {string}
        */
        this.op = op;


        /**
         * The right expression of the unary expression.
         * @type {Expression}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitUnary(this);
    }
}
    
export class Arithmetic extends Expression {

    /**
    * @param {Object} options
    * @param {string} options.op The operator of the arithmetic expression.
 * @param {Expression} options.left The left expression of the arithmetic expression.
 * @param {Expression} options.right The right expression of the arithmetic expression.
    */
    constructor({ op, left, right }) {
        super();
        
        /**
         * The operator of the arithmetic expression.
         * @type {string}
        */
        this.op = op;


        /**
         * The left expression of the arithmetic expression.
         * @type {Expression}
        */
        this.left = left;


        /**
         * The right expression of the arithmetic expression.
         * @type {Expression}
        */
        this.right = right;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitArithmetic(this);
    }
}
    
export class Relational extends Expression {

    /**
    * @param {Object} options
    * @param {string} options.op The operator of the relational expression.
 * @param {Expression} options.left The left expression of the relational expression.
 * @param {Expression} options.right The right expression of the relational expression.
    */
    constructor({ op, left, right }) {
        super();
        
        /**
         * The operator of the relational expression.
         * @type {string}
        */
        this.op = op;


        /**
         * The left expression of the relational expression.
         * @type {Expression}
        */
        this.left = left;


        /**
         * The right expression of the relational expression.
         * @type {Expression}
        */
        this.right = right;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitRelational(this);
    }
}
    
export class Logical extends Expression {

    /**
    * @param {Object} options
    * @param {string} options.op The operator of the logical expression.
 * @param {Expression} options.left The left expression of the logical expression.
 * @param {Expression} options.right The right expression of the logical expression.
    */
    constructor({ op, left, right }) {
        super();
        
        /**
         * The operator of the logical expression.
         * @type {string}
        */
        this.op = op;


        /**
         * The left expression of the logical expression.
         * @type {Expression}
        */
        this.left = left;


        /**
         * The right expression of the logical expression.
         * @type {Expression}
        */
        this.right = right;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitLogical(this);
    }
}
    
export class Ternary extends Expression {

    /**
    * @param {Object} options
    * @param {Expression} options.cond The condition of the ternary expression.
 * @param {Expression} options.trueExp The true expression of the ternary expression.
 * @param {Expression} options.falseExp The false expression of the ternary expression.
    */
    constructor({ cond, trueExp, falseExp }) {
        super();
        
        /**
         * The condition of the ternary expression.
         * @type {Expression}
        */
        this.cond = cond;


        /**
         * The true expression of the ternary expression.
         * @type {Expression}
        */
        this.trueExp = trueExp;


        /**
         * The false expression of the ternary expression.
         * @type {Expression}
        */
        this.falseExp = falseExp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitTernary(this);
    }
}
    
export class VarAssign extends Expression {

    /**
    * @param {Object} options
    * @param {string} options.id The name of the variable.
 * @param {string} options.sig The assignation of the variable.
 * @param {Expression} options.assign The expression to assign to the variable.
    */
    constructor({ id, sig, assign }) {
        super();
        
        /**
         * The name of the variable.
         * @type {string}
        */
        this.id = id;


        /**
         * The assignation of the variable.
         * @type {string}
        */
        this.sig = sig;


        /**
         * The expression to assign to the variable.
         * @type {Expression}
        */
        this.assign = assign;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitVarAssign(this);
    }
}
    
export class Return extends Expression {

    /**
    * @param {Object} options
    * @param {Expression|undefined} options.exp The expression to return.
    */
    constructor({ exp }) {
        super();
        
        /**
         * The expression to return.
         * @type {Expression|undefined}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReturn(this);
    }
}
    
export class Continue extends Expression {

    /**
    * @param {Object} options
    * 
    */
    constructor({  }) {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitContinue(this);
    }
}
    
export class Break extends Expression {

    /**
    * @param {Object} options
    * 
    */
    constructor({  }) {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBreak(this);
    }
}
    
export class Case extends Expression {

    /**
    * @param {Object} options
    * @param {Expression} options.cond The expression of the case.
 * @param {Expression[]} options.stmt The instructions of the case.
    */
    constructor({ cond, stmt }) {
        super();
        
        /**
         * The expression of the case.
         * @type {Expression}
        */
        this.cond = cond;


        /**
         * The instructions of the case.
         * @type {Expression[]}
        */
        this.stmt = stmt;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitCase(this);
    }
}
    
export class Switch extends Expression {

    /**
    * @param {Object} options
    * @param {Expression} options.cond The expression of the switch.
 * @param {Case[]} options.cases The cases of the switch.
 * @param {Case} options.def The default case of the switch.
    */
    constructor({ cond, cases, def }) {
        super();
        
        /**
         * The expression of the switch.
         * @type {Expression}
        */
        this.cond = cond;


        /**
         * The cases of the switch.
         * @type {Case[]}
        */
        this.cases = cases;


        /**
         * The default case of the switch.
         * @type {Case}
        */
        this.def = def;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitSwitch(this);
    }
}
    
export class For extends Expression {

    /**
    * @param {Object} options
    * @param {Expression} options.init The initialization of the for loop.
 * @param {Expression} options.cond The condition of the for loop.
 * @param {Expression} options.update The increment of the for loop.
 * @param {Block} options.stmt The instructions of the for loop.
    */
    constructor({ init, cond, update, stmt }) {
        super();
        
        /**
         * The initialization of the for loop.
         * @type {Expression}
        */
        this.init = init;


        /**
         * The condition of the for loop.
         * @type {Expression}
        */
        this.cond = cond;


        /**
         * The increment of the for loop.
         * @type {Expression}
        */
        this.update = update;


        /**
         * The instructions of the for loop.
         * @type {Block}
        */
        this.stmt = stmt;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFor(this);
    }
}
    
export class While extends Expression {

    /**
    * @param {Object} options
    * @param {Expression} options.cond The condition of the while loop.
 * @param {Block} options.stmt The instructions of the while loop.
    */
    constructor({ cond, stmt }) {
        super();
        
        /**
         * The condition of the while loop.
         * @type {Expression}
        */
        this.cond = cond;


        /**
         * The instructions of the while loop.
         * @type {Block}
        */
        this.stmt = stmt;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitWhile(this);
    }
}
    
export class If extends Expression {

    /**
    * @param {Object} options
    * @param {Expression} options.cond The condition of the if.
 * @param {Expression} options.stmtThen The instructions of the if.
 * @param {Expression} options.stmtElse The else of the if.
    */
    constructor({ cond, stmtThen, stmtElse }) {
        super();
        
        /**
         * The condition of the if.
         * @type {Expression}
        */
        this.cond = cond;


        /**
         * The instructions of the if.
         * @type {Expression}
        */
        this.stmtThen = stmtThen;


        /**
         * The else of the if.
         * @type {Expression}
        */
        this.stmtElse = stmtElse;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitIf(this);
    }
}
    
export class Block extends Expression {

    /**
    * @param {Object} options
    * @param {Expression[]} options.stmt The instructions of the block.
    */
    constructor({ stmt }) {
        super();
        
        /**
         * The instructions of the block.
         * @type {Expression[]}
        */
        this.stmt = stmt;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBlock(this);
    }
}
    
export class Print extends Expression {

    /**
    * @param {Object} options
    * @param {Expression[]} options.exp The expression to print.
    */
    constructor({ exp }) {
        super();
        
        /**
         * The expression to print.
         * @type {Expression[]}
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
    
export class VarDeclaration extends Expression {

    /**
    * @param {Object} options
    * @param {string} options.type The type of the variable.
 * @param {string} options.id The name of the variable.
 * @param {Expression|null} options.value The expression of the variable.
    */
    constructor({ type, id, value }) {
        super();
        
        /**
         * The type of the variable.
         * @type {string}
        */
        this.type = type;


        /**
         * The name of the variable.
         * @type {string}
        */
        this.id = id;


        /**
         * The expression of the variable.
         * @type {Expression|null}
        */
        this.value = value;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitVarDeclaration(this);
    }
}
    
export class Callee extends Expression {

    /**
    * @param {Object} options
    * @param {Expression} options.callee The name of the callee.
 * @param {Expression[]} options.args The arguments of the callee.
    */
    constructor({ callee, args }) {
        super();
        
        /**
         * The name of the callee.
         * @type {Expression}
        */
        this.callee = callee;


        /**
         * The arguments of the callee.
         * @type {Expression[]}
        */
        this.args = args;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitCallee(this);
    }
}
    
export default { Expression, Literal, Group, VarValue, Unary, Arithmetic, Relational, Logical, Ternary, VarAssign, Return, Continue, Break, Case, Switch, For, While, If, Block, Print, ExpressionStatement, VarDeclaration, Callee }
