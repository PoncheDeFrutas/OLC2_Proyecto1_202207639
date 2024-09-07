import {BaseVisitor} from "./visitor.js";
import {Environment} from "./environment.js";
import nodes, {
    Expression,
    Literal,
    Logical,
    Relational,
    VarAssign,
    VarDeclaration
} from "./nodes.js";
import {ArithmeticOperation} from "../expressions/Arithmetic.js";
import {RelationalOperation} from "../expressions/Relational.js";
import {LogicalOperation} from "../expressions/Logical.js";
import {UnaryOperation} from "../expressions/Unary.js";
import {VarDeclarationF} from "../instructions/VarDeclaration.js";
import {BreakException, ContinueException, ReturnException} from "../instructions/Transfers.js";
import {Invocable} from "../expressions/Invocable.js";
import {Natives} from "../instructions/NativeFunction.js";

export class InterpreterVisitor extends BaseVisitor {
    
    constructor() {
        super();
        this.Environment = new Environment();
        this.Console = '';

        /**
         * 
         */
        Object.entries(Natives).forEach(([name, func]) => {
           this.Environment.setVariable(name, func);
        });
        
        /**
         * @type {Expression|null}
         */
        this.prevContinue = null;
    }

    /**
     * @type [BaseVisitor['visitExpression']]
     */
    visitExpression(node) {
        throw new Error('Method visitExpression not implemented');
    }

    /**
     * @type [BaseVisitor['visitLiteral']]
     */
    visitLiteral(node) {
        return node;
    }
    
    /**
     * @type [BaseVisitor['visitArithmetic']]
     */
    visitArithmetic(node) {
        const left = node.left.accept(this);
        const right = node.right.accept(this);

        if (!(left instanceof Literal) || !(right instanceof Literal)) {
            throw new Error('Literal expected in arithmetic operation');
        }

        return ArithmeticOperation(node.op, left, right);
    }

    /**
     * @type [BaseVisitor['visitRelational']]
     */
    visitRelational(node) {
        const left = node.left.accept(this);
        const right = node.right.accept(this);
        
        if (!(left instanceof Literal) || !(right instanceof Literal)) {
            throw new Error('Literal expected in relational operation');
        }
        
        return RelationalOperation(node.op, left, right);
    }
    
    /**
     * @type [BaseVisitor['visitLogical']]
     */
    visitLogical(node) {
        const left = node.left.accept(this);
        const right = node.right.accept(this);

        if (!(left instanceof Literal) || !(right instanceof Literal)) {
            throw new Error('Logical operation with non-literal operands');
        }

        return LogicalOperation(node.op, left, right);
    }
    
    /**
     * @type [BaseVisitor['visitUnary']]
     */
    visitUnary(node) {
        if (!node) return null;

        const ext = node.exp.accept(this);

        if (!(ext instanceof Literal)) {
            throw new Error('Expected literal in unary expression');
        }

        return UnaryOperation(node.op, ext);
    }

    /**
     * @type [BaseVisitor['visitPrint']]
     */
    visitPrint(node) {
        if (!node) {
            this.Console += '\n';
            return null;
        }

        node.exp.forEach(exp => {
            if (exp != null) {
                const result = exp.accept(this);

                
                if (Array.isArray(result.value)) {
                    if (Array.isArray(result.value[0])) {
                        
                        result.value.forEach(row => {
                            if (Array.isArray(row)) {
                                row.forEach(item => {
                                    if (!Array.isArray(item)) {
                                        this.Console += item.accept(this).value + ' ';
                                    }
                                });
                            }
                        });
                    } else {
                        
                        result.value.forEach(item => {
                            if (!Array.isArray(item)) {
                                this.Console += item.accept(this).value + ' ';
                            }
                        });
                    }
                } else {
                    
                    this.Console += result.value + ' ';
                }
            }
        });

        this.Console += '\n';
    }

    /**
     * @type [BaseVisitor['visitBlock']]
     */
    visitBlock(node) {
        if (!node) return null;

        this.Environment = new Environment(this.Environment);

        node.stmt.forEach(statement => {
            statement.accept(this);
        });

        this.Environment = this.Environment.prev;
    }
    
    /**
     * @type [BaseVisitor['visitIf']]
     */
    visitIf(node) {
        if (!node) return null;
        
        const condition = node.cond.accept(this);
        
        if (!(condition instanceof Literal) || condition.type !== 'bool') {
            throw new Error('Expected boolean expression in if statement');
        }
        
        const stmt = condition.value ? node.stmtThen : node.stmtElse
        
        if (stmt) {
            stmt.accept(this);
        }
    }

    /**
     * @type [BaseVisitor['visitCase']]
     */
    visitCase(node) {
        if (!node || !Array.isArray(node.stmt)) return null;

        node.stmt.forEach(statement => {
            if (statement) {
                statement.accept(this);
            }
        });

    }

    /**
     * @type [BaseVisitor['visitSwitch']]
     */
    visitSwitch(node) {
        if (!node) return null;

        const cond = node.cond.accept(this);

        if (!(cond instanceof Literal)) {
            throw new Error('Expected literal in switch statement');
        }

        let foundMatch = false;

        this.Environment = new Environment(this.Environment);

        try {
            for (const c of node.cases) {
                if (!foundMatch) {
                    const value = c.cond.accept(this);
                    foundMatch = value.value === cond.value;
                }
                if (foundMatch) {
                    c.accept(this);
                }
            }
            if (node.def && !foundMatch) {
                node.def.accept(this);
            }
        } catch (error) {
            if (!(error instanceof BreakException)) {
                throw error;
            }
        } finally {
            this.Environment = this.Environment.prev;
        }
    }
    
    /**
     * @type [BaseVisitor['visitTernary']]
     */
    visitTernary(node) {
        if (!node) return null;

        const cond = node.cond.accept(this);

        if (!(cond instanceof Literal) || cond.type !== 'bool') {
            throw new Error('Expected boolean expression in ternary operator');
        }

        const res = cond.value ? node.trueExp.accept(this) : node.falseExp.accept(this);

        if (!(res instanceof Literal)) {
            throw new Error('Expected literal in ternary operator');
        }

        return res;
    }

    /**
     * @type [BaseVisitor['visitWhile']]
     */
    visitWhile(node) {
        if (!node) return null;

        let cond = node.cond.accept(this);
        
        if (!(cond instanceof Literal) || cond.type !== 'bool') {
            throw new Error('Expected boolean expression in while loop');
        }
        
        if (!node.stmt){
            throw new Error('Expected statement in while loop');
        }

        const lastEnvironment = this.Environment
        try {
            while (node.cond.accept(this).value) {
                node.stmt.accept(this)
            }
        } catch (error) {
            this.Environment = lastEnvironment

            if (error instanceof BreakException) { return null; }
            if (error instanceof ContinueException) { return this.visitWhile(node);}

            throw error;
        }
    }

    /**
     * @type [BaseVisitor['visitFor']]
     */
    visitFor(node) {
        if (!node) return null;
        
        if (!(node.init instanceof VarDeclaration) && !(node.init instanceof VarAssign)) {
            throw new Error('Invalid initialization in for loop');
        }
        
        if (!(node.cond instanceof Logical) && !(node.cond instanceof Relational)) {
            throw new Error('Expected logical expression in for loop');
        }
        
        if (!(node.update instanceof VarAssign)) {
            throw new Error('Invalid update in for loop');
        }
        
        const lastIncrement = this.prevContinue;
        this.prevContinue = node.update;

        const whileNode = new nodes.Block({
            stmt: [
                node.init,
                new nodes.While({
                    cond: node.cond,
                    stmt: new nodes.Block({
                        stmt: [
                            node.stmt,
                            node.update
                        ]
                    })
                })
            ]
        })

        whileNode.accept(this);

        this.prevContinue = lastIncrement;
    }

    /**
     * @type [BaseVisitor['visitContinue']]
     */
    visitContinue(node) {
        if (this.prevContinue) {
            this.prevContinue.accept(this);
        }
        throw new ContinueException();
    }

    /**
     * @type [BaseVisitor['visitBreak']]
     */
    visitBreak(node) {
        throw new BreakException()
    }

    /**
     * @type [BaseVisitor['visitReturn']]
     */
    visitReturn(node) {
        let value = null
        if (node.exp) {value = node.exp.accept(this)}
        throw new ReturnException(value)
    }

    /**
     * @type [BaseVisitor['visitVarDeclaration']]
     */
    visitVarDeclaration(node) {
        const value = node.value ? node.value.accept(this) : null;

        const result = VarDeclarationF(node.type, node.id, value);

        this.Environment.setVariable(node.id, result);
    }

    /**
     * @type [BaseVisitor['visitVarValue']]
     */
    visitVarValue(node) {
        return  this.Environment.getVariable(node.id);
    }

    /**
     * @type [BaseVisitor['visitVarAssign']]
     */
    visitVarAssign(node) {
        const value = node.assign.accept(this);

        if (!(value instanceof Literal)) {
            throw new Error('Expected literal in variable assignment');
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
        this.Environment.assignVariable(node.id, finalValue);

        return finalValue;
    }
    
    /**
     * @type [BaseVisitor['visitGroup']]
     */
    visitGroup(node) {
        return node.exp.accept(this);
    }
    
    /**
     * @type [BaseVisitor['visitExpressionStatement']]
     */
    visitExpressionStatement(node) {
        if (!node) return null;
        node.exp.accept(this);
    }

    /**
     * @type [BaseVisitor['visitCallee']]
     */
    visitCallee(node) {
        if (!node) return null;

        const func = node.callee.accept(this);
        
        const args = node.args.map(arg => arg.accept(this));
        
        if (!(func instanceof Invocable)) {
            throw new Error('Expected invocable in function call');
        }
        
        if (func.arity() !== args.length) {
            throw new Error(`Expected ${func.arity()} arguments, got ${args.length}`);
        }
        
        return func.invocable(this, args);
    }


}