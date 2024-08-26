
/**

 * @typedef {import('./nodes').Expression} Expression


 * @typedef {import('./nodes').Literal} Literal


 * @typedef {import('./nodes').Group} Group


 * @typedef {import('./nodes').VarValue} VarValue


 * @typedef {import('./nodes').VecValue} VecValue


 * @typedef {import('./nodes').MatValue} MatValue


 * @typedef {import('./nodes').Unary} Unary


 * @typedef {import('./nodes').Arithmetic} Arithmetic


 * @typedef {import('./nodes').Relational} Relational


 * @typedef {import('./nodes').Logical} Logical


 * @typedef {import('./nodes').Ternary} Ternary


 * @typedef {import('./nodes').VarAssign} VarAssign


 * @typedef {import('./nodes').VecAssign} VecAssign


 * @typedef {import('./nodes').MatAssign} MatAssign


 * @typedef {import('./nodes').Return} Return


 * @typedef {import('./nodes').Continue} Continue


 * @typedef {import('./nodes').Break} Break


 * @typedef {import('./nodes').Case} Case


 * @typedef {import('./nodes').Switch} Switch


 * @typedef {import('./nodes').For} For


 * @typedef {import('./nodes').While} While


 * @typedef {import('./nodes').If} If


 * @typedef {import('./nodes').Block} Block


 * @typedef {import('./nodes').Print} Print


 * @typedef {import('./nodes').ExpressionStatement} ExpressionStatement


 * @typedef {import('./nodes').VecSize} VecSize


 * @typedef {import('./nodes').InitialVecValue} InitialVecValue


 * @typedef {import('./nodes').VecDeclaration} VecDeclaration


 * @typedef {import('./nodes').MatSize} MatSize


 * @typedef {import('./nodes').InitialMatValue} InitialMatValue


 * @typedef {import('./nodes').MatDeclaration} MatDeclaration


 * @typedef {import('./nodes').Field} Field


 * @typedef {import('./nodes').StructDeclaration} StructDeclaration


 * @typedef {import('./nodes').VarDeclaration} VarDeclaration


 * @typedef {import('./nodes').Function} Function


 * @typedef {import('./nodes').VecIndexOf} VecIndexOf


 * @typedef {import('./nodes').MatIndexOf} MatIndexOf


 * @typedef {import('./nodes').VecJoin} VecJoin


 * @typedef {import('./nodes').MatJoin} MatJoin


 * @typedef {import('./nodes').VecLength} VecLength


 * @typedef {import('./nodes').MatLength} MatLength


 * @typedef {import('./nodes').StructAccess} StructAccess


 * @typedef {import('./nodes').StructAssign} StructAssign

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
     * @param {Literal} node
     * @returns {any}
     */
    visitLiteral(node) {
        throw new Error('Method visitLiteral not implemented');
    }
    

    /**
     * @param {Group} node
     * @returns {any}
     */
    visitGroup(node) {
        throw new Error('Method visitGroup not implemented');
    }
    

    /**
     * @param {VarValue} node
     * @returns {any}
     */
    visitVarValue(node) {
        throw new Error('Method visitVarValue not implemented');
    }
    

    /**
     * @param {VecValue} node
     * @returns {any}
     */
    visitVecValue(node) {
        throw new Error('Method visitVecValue not implemented');
    }
    

    /**
     * @param {MatValue} node
     * @returns {any}
     */
    visitMatValue(node) {
        throw new Error('Method visitMatValue not implemented');
    }
    

    /**
     * @param {Unary} node
     * @returns {any}
     */
    visitUnary(node) {
        throw new Error('Method visitUnary not implemented');
    }
    

    /**
     * @param {Arithmetic} node
     * @returns {any}
     */
    visitArithmetic(node) {
        throw new Error('Method visitArithmetic not implemented');
    }
    

    /**
     * @param {Relational} node
     * @returns {any}
     */
    visitRelational(node) {
        throw new Error('Method visitRelational not implemented');
    }
    

    /**
     * @param {Logical} node
     * @returns {any}
     */
    visitLogical(node) {
        throw new Error('Method visitLogical not implemented');
    }
    

    /**
     * @param {Ternary} node
     * @returns {any}
     */
    visitTernary(node) {
        throw new Error('Method visitTernary not implemented');
    }
    

    /**
     * @param {VarAssign} node
     * @returns {any}
     */
    visitVarAssign(node) {
        throw new Error('Method visitVarAssign not implemented');
    }
    

    /**
     * @param {VecAssign} node
     * @returns {any}
     */
    visitVecAssign(node) {
        throw new Error('Method visitVecAssign not implemented');
    }
    

    /**
     * @param {MatAssign} node
     * @returns {any}
     */
    visitMatAssign(node) {
        throw new Error('Method visitMatAssign not implemented');
    }
    

    /**
     * @param {Return} node
     * @returns {any}
     */
    visitReturn(node) {
        throw new Error('Method visitReturn not implemented');
    }
    

    /**
     * @param {Continue} node
     * @returns {any}
     */
    visitContinue(node) {
        throw new Error('Method visitContinue not implemented');
    }
    

    /**
     * @param {Break} node
     * @returns {any}
     */
    visitBreak(node) {
        throw new Error('Method visitBreak not implemented');
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
     * @param {For} node
     * @returns {any}
     */
    visitFor(node) {
        throw new Error('Method visitFor not implemented');
    }
    

    /**
     * @param {While} node
     * @returns {any}
     */
    visitWhile(node) {
        throw new Error('Method visitWhile not implemented');
    }
    

    /**
     * @param {If} node
     * @returns {any}
     */
    visitIf(node) {
        throw new Error('Method visitIf not implemented');
    }
    

    /**
     * @param {Block} node
     * @returns {any}
     */
    visitBlock(node) {
        throw new Error('Method visitBlock not implemented');
    }
    

    /**
     * @param {Print} node
     * @returns {any}
     */
    visitPrint(node) {
        throw new Error('Method visitPrint not implemented');
    }
    

    /**
     * @param {ExpressionStatement} node
     * @returns {any}
     */
    visitExpressionStatement(node) {
        throw new Error('Method visitExpressionStatement not implemented');
    }
    

    /**
     * @param {VecSize} node
     * @returns {any}
     */
    visitVecSize(node) {
        throw new Error('Method visitVecSize not implemented');
    }
    

    /**
     * @param {InitialVecValue} node
     * @returns {any}
     */
    visitInitialVecValue(node) {
        throw new Error('Method visitInitialVecValue not implemented');
    }
    

    /**
     * @param {VecDeclaration} node
     * @returns {any}
     */
    visitVecDeclaration(node) {
        throw new Error('Method visitVecDeclaration not implemented');
    }
    

    /**
     * @param {MatSize} node
     * @returns {any}
     */
    visitMatSize(node) {
        throw new Error('Method visitMatSize not implemented');
    }
    

    /**
     * @param {InitialMatValue} node
     * @returns {any}
     */
    visitInitialMatValue(node) {
        throw new Error('Method visitInitialMatValue not implemented');
    }
    

    /**
     * @param {MatDeclaration} node
     * @returns {any}
     */
    visitMatDeclaration(node) {
        throw new Error('Method visitMatDeclaration not implemented');
    }
    

    /**
     * @param {Field} node
     * @returns {any}
     */
    visitField(node) {
        throw new Error('Method visitField not implemented');
    }
    

    /**
     * @param {StructDeclaration} node
     * @returns {any}
     */
    visitStructDeclaration(node) {
        throw new Error('Method visitStructDeclaration not implemented');
    }
    

    /**
     * @param {VarDeclaration} node
     * @returns {any}
     */
    visitVarDeclaration(node) {
        throw new Error('Method visitVarDeclaration not implemented');
    }
    

    /**
     * @param {Function} node
     * @returns {any}
     */
    visitFunction(node) {
        throw new Error('Method visitFunction not implemented');
    }
    

    /**
     * @param {VecIndexOf} node
     * @returns {any}
     */
    visitVecIndexOf(node) {
        throw new Error('Method visitVecIndexOf not implemented');
    }
    

    /**
     * @param {MatIndexOf} node
     * @returns {any}
     */
    visitMatIndexOf(node) {
        throw new Error('Method visitMatIndexOf not implemented');
    }
    

    /**
     * @param {VecJoin} node
     * @returns {any}
     */
    visitVecJoin(node) {
        throw new Error('Method visitVecJoin not implemented');
    }
    

    /**
     * @param {MatJoin} node
     * @returns {any}
     */
    visitMatJoin(node) {
        throw new Error('Method visitMatJoin not implemented');
    }
    

    /**
     * @param {VecLength} node
     * @returns {any}
     */
    visitVecLength(node) {
        throw new Error('Method visitVecLength not implemented');
    }
    

    /**
     * @param {MatLength} node
     * @returns {any}
     */
    visitMatLength(node) {
        throw new Error('Method visitMatLength not implemented');
    }
    

    /**
     * @param {StructAccess} node
     * @returns {any}
     */
    visitStructAccess(node) {
        throw new Error('Method visitStructAccess not implemented');
    }
    

    /**
     * @param {StructAssign} node
     * @returns {any}
     */
    visitStructAssign(node) {
        throw new Error('Method visitStructAssign not implemented');
    }
    
}
