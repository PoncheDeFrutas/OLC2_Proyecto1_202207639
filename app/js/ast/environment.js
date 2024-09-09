
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
    set(name, value) {
        if (this.table.hasOwnProperty(name)) {
            throw new Error(`Variable ${name} already exists in this scope`);
        }
        this.table[name] = value;
    }

    /**
     * @param {string} name
     * @returns {any}
     */
    get(name) {
        if (this.table.hasOwnProperty(name)) {
            return this.table[name];
        }

        if (this.prev) {
            return this.prev.get(name);
        }

        throw new Error(`Variable ${name} not found`);
    }


    /**
     * @param {string} name
     * @param {any} value
     */
    assign(name, value) {
        if (this.table.hasOwnProperty(name)) {
            if (this.table[name].type !== value.type) {
                this.table[name].value = null;
                return;
            }
            this.table[name] = value;
            return;
        }

        if (this.prev) {
            this.prev.assign(name, value);
            return;
        }

        throw new Error(`Variable ${name} not found`);
    }
}