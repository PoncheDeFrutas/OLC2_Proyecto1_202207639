import {Invocable} from "../expressions/Invocable.js";
import {StructDeclaration} from "../ast/nodes.js";
import {Instance} from "./Instance.js";

export class Struct extends Invocable {

    constructor(node, closure) {
        super();

        /** @type {StructDeclaration} */
        this.node = node;

        /** @type {Environment} */
        this.closure = closure;
    }

    arity() {

    }

    /**
     * @type [Invocable['invoke']]
     * @type {Instance} newInstance
     */
    invoke(interpreter, args) {
        const actEnvironment = interpreter.Environment;
        const newInstance = new Instance(this);
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