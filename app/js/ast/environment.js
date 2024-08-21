
export class Environment {

    /**
     * @param {Environment} parent
     */
    constructor(parent = null) {
        this.name = '';
        this.prev = parent;
        this.table = {};
    }

    /**
     * @param {string} name
     * @param {any} value
     * @returns {any}
     */
    setVariable(name, value) {
        if (this.table[name]) {
            throw new Error(`Variable ${name} already exists in this scope`);
        }
        this.table[name] = value;
    }

    /**
     * @param {string} name
     * @returns {any}
     */
    getVariable(name) {
        const value = this.table[name];

        if (value) return value;

        if (this.prev) {
            return this.prev.getVariable(name);
        }

        throw new Error(`Variable ${name} not found`);
    }

    /**
     * @param {string} name
     * @param {any} value
     */
    assignVariable(name, value) {
        const variable = this.table[name];

        if (variable) {
            if (this.table[name].type !== value.type) {
                this.table[name].value = null;
                return;
            }
            this.table[name] = value;
            return;
        }

        if (this.prev) {
            this.prev.assignVariable(name, value);
            return;
        }

        throw new Error(`Variable ${name} not found`);
    }
}