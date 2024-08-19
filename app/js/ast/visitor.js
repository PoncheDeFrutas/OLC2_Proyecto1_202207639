
/**

 * @typedef {import('./nodes').Expression} Expression


 * @typedef {import('./nodes').ArithmeticOperation} ArithmeticOperation


 * @typedef {import('./nodes').RelationalOperation} RelationalOperation


 * @typedef {import('./nodes').LogicalOperation} LogicalOperation


 * @typedef {import('./nodes').UnaryOperation} UnaryOperation


 * @typedef {import('./nodes').Group} Group


 * @typedef {import('./nodes').Literal} Literal


 * @typedef {import('./nodes').VariableDeclaration} VariableDeclaration


 * @typedef {import('./nodes').VariableValue} VariableValue


 * @typedef {import('./nodes').Print} Print


 * @typedef {import('./nodes').Assignment} Assignment


 * @typedef {import('./nodes').ExpressionStatement} ExpressionStatement


 * @typedef {import('./nodes').TernaryOperation} TernaryOperation


 * @typedef {import('./nodes').Block} Block


 * @typedef {import('./nodes').If} If


 * @typedef {import('./nodes').While} While


 * @typedef {import('./nodes').For} For


 * @typedef {import('./nodes').Case} Case


 * @typedef {import('./nodes').Switch} Switch


 * @typedef {import('./nodes').Break} Break

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
     * @param {Literal} node
     * @returns {any}
     */
    visitLiteral(node) {
        throw new Error('Method visitLiteral not implemented');
    }
    

    /**
     * @param {VariableDeclaration} node
     * @returns {any}
     */
    visitVariableDeclaration(node) {
        throw new Error('Method visitVariableDeclaration not implemented');
    }
    

    /**
     * @param {VariableValue} node
     * @returns {any}
     */
    visitVariableValue(node) {
        throw new Error('Method visitVariableValue not implemented');
    }
    

    /**
     * @param {Print} node
     * @returns {any}
     */
    visitPrint(node) {
        throw new Error('Method visitPrint not implemented');
    }
    

    /**
     * @param {Assignment} node
     * @returns {any}
     */
    visitAssignment(node) {
        throw new Error('Method visitAssignment not implemented');
    }
    

    /**
     * @param {ExpressionStatement} node
     * @returns {any}
     */
    visitExpressionStatement(node) {
        throw new Error('Method visitExpressionStatement not implemented');
    }
    

    /**
     * @param {TernaryOperation} node
     * @returns {any}
     */
    visitTernaryOperation(node) {
        throw new Error('Method visitTernaryOperation not implemented');
    }
    

    /**
     * @param {Block} node
     * @returns {any}
     */
    visitBlock(node) {
        throw new Error('Method visitBlock not implemented');
    }
    

    /**
     * @param {If} node
     * @returns {any}
     */
    visitIf(node) {
        throw new Error('Method visitIf not implemented');
    }
    

    /**
     * @param {While} node
     * @returns {any}
     */
    visitWhile(node) {
        throw new Error('Method visitWhile not implemented');
    }
    

    /**
     * @param {For} node
     * @returns {any}
     */
    visitFor(node) {
        throw new Error('Method visitFor not implemented');
    }
    

    /**
     * @param {Case} node
     * @returns {any}
     */
    visitCase(node) {
        throw new Error('Method visitCase not implemented');
    }
    

    /**
     * @param {Switch} node
     * @returns {any}
     */
    visitSwitch(node) {
        throw new Error('Method visitSwitch not implemented');
    }
    

    /**
     * @param {Break} node
     * @returns {any}
     */
    visitBreak(node) {
        throw new Error('Method visitBreak not implemented');
    }
    
}
