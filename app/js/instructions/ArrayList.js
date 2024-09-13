import {ArrayListInstance} from "./StructInstance.js";
import {Literal} from "../ast/nodes.js";
import {Invocable} from "../expressions/Invocable.js";


export class ArrayList extends Invocable {

    constructor(node, args) {
        super();

        /** @type {ArrayListInstance} */
        this.node = node;
        /** @type {Array<any>} */
        this.args = args;
    }

    /**
     * @returns {number}
     */
    arity() {

    }

    /**
     * @type [Invocable['invoke']]
     * @type {ArrayListInstance} newInstance
     */
    invoke(interpreter, args) {
        const node = this.node;
        if (node.dim && node.type) {
            const result = this.createDefaultArray(node.type, node.dim);
            console.log(result);
            this.node.type = node.type + '[]'.repeat(node.dim.length);
            return result;
        }
        if (node.args) {
            const result = this.getArray(interpreter);
            console.log(result);
            return result;
        }
    }

    getDefaultValue(type) {
        const defaultValues = {
            int: new Literal({ value: 0, type: "int" }),
            float: new Literal({ value: 0.0, type: "float" }),
            bool: new Literal({ value: false, type: "bool" }),
            string: new Literal({ value: '', type: "string" }),
            char: new Literal({ value: '', type: "char" })
        };

        return defaultValues[type] !== undefined ? defaultValues[type] : new Literal({ value: null, type: type });
    }

    createDefaultArray(type, dim) {
        if (dim.length === 1) {
            const literalArray = Array.from({ length: dim[0].value }, () => this.getDefaultValue(type));
            return new ArrayListInstance(null, literalArray)
        } else {
            const literalsArray = Array.from({ length: dim[0].value }, () =>
                new Literal({
                    type: type + '[]'.repeat(dim.length - 1),
                    value: this.createDefaultArray(type, dim.slice(1))
                })
            );
            return new ArrayListInstance(null, literalsArray);
        }
    }
    
    getArray(interpreter){
        const result = this.node.args.map( exp => {
            if (exp != null) {
                const result =  exp.accept(interpreter);
                return result;
            }
            return null;
        })

        if (this.node.type === undefined) {
            this.node.type = result[0].type + '[]';
        } else {
            this.node.type += '[]'
        }

        return new ArrayListInstance(null, result);
    }
}