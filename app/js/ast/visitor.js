
/**

 * @typedef {import('./nodes').Expression} Expression


 * @typedef {import('./nodes').ArithmeticOperation} ArithmeticOperation


 * @typedef {import('./nodes').RelationalOperation} RelationalOperation


 * @typedef {import('./nodes').LogicalOperation} LogicalOperation


 * @typedef {import('./nodes').UnaryOperation} UnaryOperation


 * @typedef {import('./nodes').Group} Group


 * @typedef {import('./nodes').Identifier} Identifier


 * @typedef {import('./nodes').Literal} Literal

 */


/**
 * Base visitor class.
 * @abstract
 */
export class BaseVisitor {

    
    /**
     * @param {Expression} node
     * @returns {any}
     */
    visitExpression(node) {
        throw new Error('Method visitExpression not implemented');
    }
    

    /**
     * @param {ArithmeticOperation} node
     * @returns {any}
     */
    visitArithmeticOperation(node) {
        throw new Error('Method visitArithmeticOperation not implemented');
    }
    

    /**
     * @param {RelationalOperation} node
     * @returns {any}
     */
    visitRelationalOperation(node) {
        throw new Error('Method visitRelationalOperation not implemented');
    }
    

    /**
     * @param {LogicalOperation} node
     * @returns {any}
     */
    visitLogicalOperation(node) {
        throw new Error('Method visitLogicalOperation not implemented');
    }
    

    /**
     * @param {UnaryOperation} node
     * @returns {any}
     */
    visitUnaryOperation(node) {
        throw new Error('Method visitUnaryOperation not implemented');
    }
    

    /**
     * @param {Group} node
     * @returns {any}
     */
    visitGroup(node) {
        throw new Error('Method visitGroup not implemented');
    }
    

    /**
     * @param {Identifier} node
     * @returns {any}
     */
    visitIdentifier(node) {
        throw new Error('Method visitIdentifier not implemented');
    }
    

    /**
     * @param {Literal} node
     * @returns {any}
     */
    visitLiteral(node) {
        throw new Error('Method visitLiteral not implemented');
    }
    
}
