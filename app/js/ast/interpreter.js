import {BaseVisitor} from "./visitor.js";
import {Literal} from "./nodes.js";
import {ArithmeticOperation} from "../expressions/Arithmetic.js";
import {RelationalOperation} from "../expressions/Relational.js";
import {LogicalOperation} from "../expressions/Logical.js";
import {Environment} from "./environment.js";
import {UnaryOperation} from "../expressions/Unary.js";
import {VarDeclaration} from "../instructions/VarDeclaration.js";

export class InterpreterVisitor extends BaseVisitor {
    
    constructor() {
        super();
        this.Environment = new Environment()
        this.Console = ''
    }

    /**
     * @type [BaseVisitor['visitExpression']]
     */
    visitExpression(node) {
        throw new Error('Method visitExpression not implemented');
    }

    /**
     * @type [BaseVisitor['visitBinaryOperation']]
     */
    visitArithmeticOperation(node) {
        const left = node.le.accept(this);
        const right = node.ri.accept(this);

        if (!(left instanceof Literal) || !(right instanceof Literal)) {
            throw new Error('Both operands must be literals');
        }

        return ArithmeticOperation(node.op, left, right);
    }

    /**
     * @type [BaseVisitor['visitRelationalOperation']]
     */
    visitRelationalOperation(node) {
        const left = node.le.accept(this);
        const right = node.ri.accept(this);

        if (!(left instanceof Literal) || !(right instanceof Literal)) {
            throw new Error('Both operands must be literals');
        }

        return RelationalOperation(node.op, left, right);
    }


    /**
     * @type [BaseVisitor['visitLogicalOperation']]
     */
    visitLogicalOperation(node) {
        const left = node.le.accept(this);
        const right = node.ri.accept(this);

        if (!(left instanceof Literal) || !(right instanceof Literal)) {
            throw new Error('Both operands must be literals');
        }

        return LogicalOperation(node.op, left, right);
    }


    /**
     * @type [BaseVisitor['visitUnaryOperation']]
     */
    visitUnaryOperation(node) {
        const ext = node.exp.accept(this);

        if (!(ext instanceof Literal)) {
            throw new Error('Operand must be a literal');
        }
        
        return UnaryOperation(node.op, ext);
    }


    /**
     * @type [BaseVisitor['visitGroup']]
     */
    visitGroup(node) {
        return node.exp.accept(this);
    }

    /**
     * @type [BaseVisitor['visitLiteral']]
     */
    visitLiteral(node) {
        return node
    }
    
    /**
     * @type [BaseVisitor['visitVariableDeclaration']]
     */
    visitVariableDeclaration(node) {
        const value = node.value ? node.value.accept(this) : null
        
        const result = VarDeclaration(node.type, node.id, value)

        this.Environment.setVariable(node.id, result)
    }

    /**
     * @type [BaseVisitor['visitAssignment']]
     */
    visitAssignment(node) {
        const value = node.assign.accept(this);

        if (!(value instanceof Literal)) {
            throw new Error('Value must be a literal');
        }

        const operations = {
            '=': () => value,
            '+=': () => ArithmeticOperation('+', this.Environment.getVariable(node.id), value),
            '-=': () => ArithmeticOperation('-', this.Environment.getVariable(node.id), value)
        };

        if (!(node.sig in operations)) {
            throw new Error(`Unsupported operation: ${node.sig}`);
        }

        const finalValue = operations[node.sig]();
        this.Environment.setVariableValue(node.id, finalValue);

        return finalValue;
    }

    /**
     * @type [BaseVisitor['visitVariableValue']]
     */
    visitVariableValue(node) {
        return this.Environment.getVariable(node.id)
    }

    /**
     * @type [BaseVisitor['visitPrint']]
     */
    visitPrint(node) {
        const value = node.exp.accept(this)
        this.Console += value.value + '\n'
    }

    /**
     * @type [BaseVisitor['visitExpressionStatement']]
     */
    visitExpressionStatement(node) {
        node.exp.accept(this)
    }

    /**
     * @type [BaseVisitor['visitTernaryOperation']]
     */
    visitTernaryOperation(node) {
        const cond = node.cond.accept(this);

        if (!(cond instanceof Literal && cond.type === 'bool')) {
            throw new Error('Condition must be a boolean literal');
        }

        const exp = cond.value ? node.trueExp : node.falseExp;
        const result = exp.accept(this);

        if (!(result instanceof Literal)) {
            throw new Error(`${cond.value ? 'True' : 'False'} expression must be a literal`);
        }

        return result;
    }

    /**
     * @type [BaseVisitor['visitBlock']]
     */
    visitBlock(node) {
        const lastEnvironment = this.Environment
        this.Environment = new Environment(lastEnvironment)

        node.statements.forEach(statement => {statement.accept(this)})

        this.Environment = lastEnvironment
    }
}