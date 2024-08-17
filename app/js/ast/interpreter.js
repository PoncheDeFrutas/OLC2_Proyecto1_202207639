import {BaseVisitor} from "./visitor.js";
import {Literal} from "./nodes.js";
import {ArithmeticOperation} from "../expressions/Arithmetic.js";
import {RelationalOperation} from "../expressions/Relational.js";
import {LogicalOperation} from "../expressions/Logical.js";

export class InterpreterVisitor extends BaseVisitor {

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
        
        switch (node.op) {
            case '-':
                if (ext.type !== 'int' && ext.type !== 'float') {
                    throw new Error('Invalid unary operator');
                }
                return new Literal({type: ext.type, value: -ext.value});
            case '!':
                if (ext.type !== 'bool') {
                    throw new Error('Invalid unary operator');
                }
                return new Literal({type: 'bool', value: !ext.value});
            default:
                throw new Error('Invalid unary operator');
        }
    }


    /**
     * @type [BaseVisitor['visitGroup']]
     */
    visitGroup(node) {
        throw new Error('Method visitGroup not implemented');
    }


    /**
     * @type [BaseVisitor['visitIdentifier']]
     */
    visitIdentifier(node) {
        throw new Error('Method visitIdentifier not implemented');
    }


    /**
     * @type [BaseVisitor['visitLiteral']]
     */
    visitLiteral(node) {
        return node
    }

}