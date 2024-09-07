import {Invocable} from "../expressions/Invocable.js";

class NativeFunction extends Invocable {
    constructor(arity, func) {
        super();
        this.arity = arity;
        this.invocable = func;
    }
}

export const Natives = {
    'time': new NativeFunction(() => 0, () => new Date().getTime()),

}