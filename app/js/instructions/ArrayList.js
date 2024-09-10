import {ArrayListInstance} from "./StructInstance.js";
import {ArrayListDeclaration, Literal} from "../ast/nodes.js";
import {Invocable} from "../expressions/Invocable.js";


export class ArrayList extends Invocable {

    constructor(node, args) {
        super();

        /** @type {ArrayListDeclaration} */
        this.node = node;
        /** @type {Array<any>} */
        this.args = args;
    }

    /**
     * @returns {number}
     */
    arity() {
        let dimensions = 0;
        let currentArray = this.args.value;

        while (Array.isArray(currentArray)) {
            dimensions++;
            currentArray = currentArray[0];
        }

        return dimensions;

    }

    /**
     * @type [Invocable['invoke']]
     * @type {ArrayListInstance} newInstance
     */
    invoke(interpreter, args) {
        if (this.arity() !== this.node.dim.length) {
            throw new Error('Invalid number of dimensions');
        }
        if (this.args.type !== this.node.type + "[]".repeat(this.arity())) {
            throw new Error('Invalid type');
        }
        return new Literal ({type: this.args.type, value:new ArrayListInstance(this, this.args)});
    }
}