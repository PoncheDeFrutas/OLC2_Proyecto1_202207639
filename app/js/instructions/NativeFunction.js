import {Invocable} from "../expressions/Invocable.js";
import {Literal} from "../ast/nodes.js";

class NativeFunction extends Invocable {
    constructor(arity, func) {
        super();
        this.arity = arity;
        this.invoke = func;
    }
}

export const Natives = {
    'parseInt': new NativeFunction(() => 1, (interpreter, args) => {
        if (!(args[0] instanceof Literal)) {
            throw new Error('Argument must be a literal');
        }
        if (args[0].type !== 'string') {
            throw new Error('Argument must be a string');
        }
        const value = parseInt(args[0].value);
        if (isNaN(value)) {
            throw new Error('Argument must be a number');
        }
        return new Literal({type: 'int', value});
    }),
    'parseFloat': new NativeFunction(() => 1, (interpreter, args) => {
        if (!(args[0] instanceof Literal)) {
            throw new Error('Argument must be a literal');
        }
        if (args[0].type !== 'string') {
            throw new Error('Argument must be a string');
        }
        const value = parseFloat(args[0].value);
        if (isNaN(value)) {
            throw new Error('Argument must be a number');
        }
        return new Literal({type: 'float', value});
    }),
    'toString': new NativeFunction(() => 1, (interpreter, args) => {
        if (!(args[0] instanceof Literal)) {
            throw new Error('Argument must be a literal');
        }
        if (args[0].type !== 'string' && args[0].type !== 'int' && args[0].type !== 'float' && args[0].type !== 'bool') {
            throw new Error('Argument must be a primitive type');
        }
        return new Literal({type: 'string', value: args[0].value.toString()});
    }),
    'toLowerCase': new NativeFunction(() => 1, (interpreter, args) => {
        if (!(args[0] instanceof Literal)) {
            throw new Error('Argument must be a literal');
        }
        if (args[0].type !== 'string') {
            throw new Error('Argument must be a string');
        }
        return new Literal({type: 'string', value: args[0].value.toLowerCase()});
    }),
    'toUpperCase': new NativeFunction(() => 1, (interpreter, args) => {
        if (!(args[0] instanceof Literal)) {
            throw new Error('Argument must be a literal');
        }
        if (args[0].type !== 'string') {
            throw new Error('Argument must be a string');
        }
        return new Literal({type: 'string', value: args[0].value.toUpperCase()});
    }),
    'typeof': new NativeFunction(() => 1, (interpreter, args) => {
        if (!(args[0] instanceof Literal)) {
            throw new Error('Argument must be a literal');
        }
        return new Literal({type: 'string', value: args[0].type});
    })
}