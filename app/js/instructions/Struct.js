import {Invocable} from "../expressions/Invocable.js";
import {StructDeclaration} from "../ast/nodes.js";
import { StructInstance} from "./StructInstance.js";

export class Struct extends Invocable {

    /**
     * @param {StructDeclaration} node
     * @param {Environment} closure
     */
    constructor(node, closure) {
        super();

        /** @type {StructDeclaration} */
        this.node = node;

        /** @type {Environment} */
        this.closure = closure;
    }

    /**
     * @returns {number}
     */
    arity() {

    }

    /**
     * @type [Invocable['invoke']]
     * @type {StructInstance} newInstance
     */
    invoke(interpreter, args) {
        const actEnvironment = interpreter.Environment;
        const newInstance = new StructInstance(this, this.closure);
        interpreter.Environment = newInstance.properties;

        this.node.fields.forEach((field, i) => {
            field.accept(interpreter);
        })
        
        args.forEach((arg, i) => {
            arg.accept(interpreter);
        })

        newInstance.properties.prev = null;
        
        interpreter.Environment = actEnvironment;
        return newInstance;
    }
}

