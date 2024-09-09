import {Invocable} from "../expressions/Invocable.js";
import {FuncDeclaration} from "../ast/nodes.js";
import {Environment} from "../ast/environment.js";
import {ReturnException} from "./Transfers.js";

export class OutsiderFunction extends Invocable {

    constructor(node, closure) {
        super();

        /** @type {FuncDeclaration} */
        this.node = node;

        /** @type {Environment} */
        this.closure = closure;
    }

    arity() {
        return this.node.params.length;
    }

    /**
     * @type {Invocable['invoke']}
     */
    invoke(interpreter, args) {
        const actEnvironment = interpreter.Environment;
        interpreter.Environment = new Environment(this.closure);
        
        this.node.params.forEach((param, i) => {
                param.value = args[i];
                param.accept(interpreter);
            }
        )

        try {
            this.node.block.accept(interpreter);
        } catch (error) {
            if (error instanceof ReturnException) {
                if (this.node.type === 'void' && error.value !== null) {
                    throw new Error(`Return with a value in a void function`);
                }

                if (this.node.type === 'var') {
                    return error.value;
                }

                if (this.node.type !== error.value.type) {
                    throw new Error(`Return type mismatch`);
                }
                
                return error.value;
            }
        } finally {
            interpreter.Environment = actEnvironment;
        }
    }
}