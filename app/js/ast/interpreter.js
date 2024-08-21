import {BaseVisitor} from "./visitor.js";
import {Environment} from "./environment.js";
import {
    Break,
    Continue,
    Literal,
    Logical, Relational,
    Return,
    VarAssign,
    VarDeclaration
} from "./nodes.js";
import {ArithmeticOperation} from "../expressions/Arithmetic.js";
import {RelationalOperation} from "../expressions/Relational.js";
import {LogicalOperation} from "../expressions/Logical.js";
import {UnaryOperation} from "../expressions/Unary.js";
import {VarDeclarationF} from "../instructions/VarDeclaration.js";

export class InterpreterVisitor extends BaseVisitor {
    
    constructor() {
        super();
        this.Environment = new Environment();
        this.Environment.name = 'global';
        this.Console = '';
        this.lastBlockType = '';
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
     * @type [BaseVisitor['visitContinue']]
     */
    visitContinue(node) {
        for (let env = this.Environment; env; env = env.prev) {
            if (env.name === 'loop') {
                return node;
            }
        }
        throw new Error('Continue statement outside of loop');
    }
    
    /**
     * @type [BaseVisitor['visitBreak']]
     */
    visitBreak(node) {
        for (let env = this.Environment; env; env = env.prev) {
            if (env.name === 'loop' || env.name === 'switch') {
                return node;
            }
        }
        throw new Error('Break statement outside of loop or switch');
    }
    
    /**
     * @type [BaseVisitor['visitReturn']]
     */
    visitReturn(node) {
        for (let env = this.Environment; env; env = env.prev) {
            if (env.name === 'function') {
                return node
            }
        }
        throw new Error('Return statement outside of function');
    }

    /**
     * @type [BaseVisitor['visitBlock']]
     */
    visitBlock(node) {
        if (!node) return null;

        this.Environment = new Environment(this.Environment);
        this.Environment.name = this.lastBlockType;
        this.lastBlockType = '';
        let result = null;

        for (const statement of node.stmt) {
            if (!statement) continue;
            result = statement.accept(this);
            if (result) break;
        }

        this.Environment = this.Environment.prev;
        return result;
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
            this.lastBlockType = 'if';
            return stmt.accept(this);
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
        
        while (cond.value) {
            this.lastBlockType = 'loop';
            const result = node.stmt.accept(this);
            if (result) {
                if (result instanceof Break) {
                    break;
                } else if (result instanceof Continue) {
                    cond = node.cond.accept(this);
                    continue;
                } else if (result instanceof Return) {
                    return result;
                }
            }
            cond = node.cond.accept(this);
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
        
        this.Environment = new Environment(this.Environment);
        this.Environment.name = 'loop';

        node.init.accept(this);

        let result = null;
        let cond = node.cond.accept(this);

        if (!(cond instanceof Literal) || cond.type !== 'bool') {
            throw new Error('Expected boolean expression in for loop');
        }

        while (cond.value) {
            result = node.stmt.accept(this);
            if (result) {
                if (result instanceof Break) {
                    break;
                } else if (result instanceof Continue) {
                    node.update.accept(this);
                    cond = node.cond.accept(this);
                    continue;
                } else if (result instanceof Return) {
                    break;
                }
            }
            node.update.accept(this);
            cond = node.cond.accept(this);
        }

        this.Environment = this.Environment.prev;
        return result;
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
     * @type [BaseVisitor['visitCase']]
     */
    visitCase(node) {
        if (!node) return null;
        
        let result = null;
        
        if (node.stmt && Array.isArray(node.stmt)) {
            for (const statement of node.stmt) {
                if (!statement) continue;
                result = statement.accept(this);
                if (result) break;
            }
        }
        
        return result;
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
        
        let foundMatch, breakFound = false;
        let result = null;
        
        this.Environment = new Environment(this.Environment);
        this.Environment.name = 'switch';
        
        for (const c of node.cases) {
            if (!foundMatch) {
                const value = c.cond.accept(this);
                foundMatch = value.value === cond.value;
            }
            if (foundMatch && !breakFound) {
                result = c.accept(this);
                if (result instanceof Break) {
                    result = null;
                    breakFound = true;
                    break;
                }
                if (result instanceof Continue) {
                    breakFound = true;
                    break;
                }
            }
        }
        
        if (node.def && (!foundMatch || (foundMatch && !breakFound))) {
            result = node.def.accept(this);
        }

        this.Environment = this.Environment.prev;
        return result;
    }
    
    /**
     * @type [BaseVisitor['visitVecDeclaration']]
     */
    visitVecDeclaration(node) {
        if (!node) return null;

        const vec = node.exp.accept(this);

        if (!(vec instanceof Literal) || !Array.isArray(vec.value)) {
            throw new Error('Expected literal in vector declaration');
        }

        if (vec.type !== `vec<${node.type}>`) {
            throw new Error(`Type mismatch: expected vec<${node.type}> but found ${vec.type}`);
        }

        this.Environment.setVariable(node.id, vec);
    }
    
    /**
     * @type [BaseVisitor['visitVecSize']]
     */
    visitVecSize(node) {
        if (!node) return null;

        const size = node.exp.accept(this);

        if (!(size instanceof Literal) || size.type !== 'int') {
            throw new Error('Expected integer in vector size declaration');
        }

        const defaultValues = {
            int: 0,
            float: 0.0,
            string: "",
            boolean: false,
            char: "\u0000",
            struct: null
        };

        const defaultValue = defaultValues[node.type] !== undefined ? defaultValues[node.type] : null;

        const vec = Array(size.value).fill(new Literal({value: defaultValue, type: node.type}))

        return new Literal({value: vec, type: `vec<${node.type}>`});
    }
    
    /**
     * @type [BaseVisitor['visitInitialVecValue']]
     */
    visitInitialVecValue(node) {
        if (!node) return null;

        const vec = [];
        const expList = node.exp;

        if (expList.length === 0) return vec;

        let firstValue = expList[0].accept(this);

        if (!(firstValue instanceof Literal)) {
            throw new Error('Expected literal in vector declaration');
        }

        const expectedType = firstValue.type;
        vec.push(firstValue);

        for (let i = 1; i < expList.length; i++) {
            const exp = expList[i];
            if (!exp) continue;

            const value = exp.accept(this);

            if (!(value instanceof Literal)) {
                throw new Error('Expected literal in vector declaration');
            }

            if (value.type !== expectedType) {
                throw new Error(`Type mismatch: expected ${expectedType} but found ${value.type}`);
            }

            vec.push(value);
        }

        return new Literal({value: vec, type: `vec<${expectedType}>`});
    }
    
    /**
     * @type [BaseVisitor['visitVecValue']]
     */
    visitVecValue(node) {
        if (!node) return null;

        const vec = this.Environment.getVariable(node.id);

        if (!vec || !Array.isArray(vec.value)) {
            throw new Error('Expected vector in vector value');
        }

        const index = node.exp.accept(this);

        if (!(index instanceof Literal) || index.type !== 'int') {
            throw new Error('Expected integer in vector value');
        }

        if (index.value < 0 || index.value >= vec.value.length) {
            throw new Error('Index out of bounds in vector value');
        }

        return vec.value[index.value];
    }
}