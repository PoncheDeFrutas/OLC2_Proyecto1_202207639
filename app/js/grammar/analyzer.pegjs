{
    const createNode = (typeNode, props) => {
        const type = {
            'Literal': nodes.Literal,
            'Unary': nodes.Unary,
            'Arithmetic': nodes.Arithmetic,
            'Relational': nodes.Relational,
            'Logical': nodes.Logical,
            'Group': nodes.Group,
            'VarDeclaration': nodes.VarDeclaration,
            'Print': nodes.Print,
            'VarAssign': nodes.VarAssign,
            'VecAssign': nodes.VecAssign,
            'MatAssign': nodes.MatAssign,
            'ExpressionStatement': nodes.ExpressionStatement,
            'VarValue': nodes.VarValue,
            'Ternary': nodes.Ternary,
            'Block': nodes.Block,
            'If': nodes.If,
            'While': nodes.While,
            'For': nodes.For,
            'Case': nodes.Case,
            'Switch': nodes.Switch,
            'Break': nodes.Break,
            'Continue': nodes.Continue,
            'Return': nodes.Return,
            'StructDeclaration': nodes.StructDeclaration,
            'Field': nodes.Field,
            'MatDeclaration': nodes.MatDeclaration,
            'InitialMatValue': nodes.InitialMatValue,
            'MatSize': nodes.MatSize,
            'MatValue': nodes.MatValue,
            'VecDeclaration': nodes.VecDeclaration,
            'InitialVecValue': nodes.InitialVecValue,
            'VecSize': nodes.VecSize,
            'VecValue': nodes.VecValue,
            'VecIndexOf': nodes.VecIndexOf,
            'MatIndexOf': nodes.MatIndexOf,
            'VecJoin': nodes.VecJoin,
            'MatJoin': nodes.MatJoin,
            'VecLength': nodes.VecLength,
            'MatLength': nodes.MatLength,
            'Function': nodes.Function,
            'StructAccess': nodes.StructAccess,
            'StructAssign': nodes.StructAssign,
        }

        const node = new type[typeNode](props)
        node.location = location()
        return node
    }
}

Program
    = _ ( Comment )? s:Statements* _ { return s }

Statements
    = Statement
    / Comment _ { return undefined }

Statement
    = f:Function _ ( Comment _ )? { return f }
    / vd:VarDeclaration _ ( Comment _ )? { return vd }
    / sd:StructDeclaration _ ( Comment _ )? { return sd }
    / md:MatDeclaration _ ( Comment _ )? { return md }
    / vd:VecDeclaration _ ( Comment _ )? { return vd }
    / s:Sentence _ ( Comment _)? { return s }


Function
    = type:(Types/Id) _ id:Id _ "(" _ params:Params? _ ")" _ block:Block {
        return createNode('Function', { type, id, params, block })
    }

Params
    = head:Param tail:( _ "," _ Param)* {
        return [head].concat(tail.map(e => e[3]));
    }

Param
    = type:(Types/Id) _ "[" _ "]" _ "[" _ "]" _ id:Id {
        return createNode('MatDeclaration', { type, id, exp: null })
    }
    / type:(Types/Id) _ "[" _ "]" _ id:Id {
        return createNode('VecDeclaration', { type, id, exp: null })
    }
    / type:(Types/Id) _ id:Id {
        return createNode('VarDeclaration', { type, id, value: null })
    }

/* ------------------------------------------------------Declaration------------------------------------------------ */
VarDeclaration
    = type:(Types / "var") _ id:Id _ exp:("=" _ exp:Expression {return exp})? _ ";" {
        return createNode('VarDeclaration', { type, id, value: exp || null })
    }
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------Struct----------------------------------------------------- */
StructDeclaration
    = "struct" _ id:Id _ "{" _ (Comment _)?  fields:(fields:Field _ (Comment _)? {return fields})* "}" _ ";"{
        return createNode('StructDeclaration', { id, fields })
     }

Field
    = type:(Types/Id) _ id:Id _ ";"  {
        return createNode('Field', { type, id })
     }
/* ------------------------------------------------------------------------------------------------------------------ */


/* ------------------------------------------------------Matrix----------------------------------------------------- */
MatDeclaration
    =  type:(Types/Id) _ "[" _ "]" _ "[" _ "]" _ id:Id _ "=" _ mi:MatInitialization _ ";" {
        return createNode('MatDeclaration', { type, id, exp: mi })
    }

MatInitialization
    = InitialMatValue
    / MatSize
    / Id

InitialMatValue
    = "{" _ expM:ExpressionMatrix _ "}" {
        return createNode('InitialMatValue', { exp: expM })
    }

MatSize
    = "new" _ type:(Types/Id) _ "[" _ exp1:Expression _ "]" _ "[" _ exp2:Expression _ "]" {
        return createNode('MatSize', { type, exp1, exp2 })
    }


ExpressionMatrix
    = head:InitialVecValue tail:( _ "," _ InitialVecValue)* {
        return [head].concat(tail.map(e => e[3]));
    }
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------Vector----------------------------------------------------- */
VecDeclaration
    =  type:(Types/Id) _ "[" _ "]" _ id:Id _ "=" _ vi:VecInitialization _ ";" {
        return createNode('VecDeclaration', { type, id, exp: vi })
    }

VecInitialization
    = InitialVecValue
    / VecSize
    / IdValue

InitialVecValue
    = "{" _ expL:ExpressionList _ "}" {
        return createNode('InitialVecValue', { exp: expL })
    }

VecSize
    = "new" _ type:(Types/Id) _ "[" _ exp:Expression _ "]" {
        return createNode('VecSize', { type, exp })
    }

ExpressionList
    = head:Expression tail:( _ "," _ Expression)* {
        return [head].concat(tail.map(e => e[3]));
    }
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------Sentence--------------------------------------------------- */
Sentence
    = Print
    / Block
    / If
    / While
    / For
    / Switch
    / Break
    / Continue
    / Return
    / e:Expression _ ";" {
        return createNode('ExpressionStatement', { exp: e })
    }
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------Print------------------------------------------------------ */
Print
    = "System.out.println" _ "(" _ exp:ExpressionList _ ")" _ ";" {
        return createNode('Print', { exp })
    }
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------Block------------------------------------------------------ */
Block
    = "{" _ s:Statements* _ "}" {
        return createNode('Block', { stmt: s })
    }
/* ------------------------------------------------------------------------------------------------------------------ */

/* --------------------------------------------------------If-------------------------------------------------------- */
If
    = "if" _ "(" _ cond:Expression _ ")" _ stmtThen:Block
        stmtElse:( _ "else" _ stmtElse:Sentence { return stmtElse } )? {
        return createNode('If', { cond, stmtThen, stmtElse })
     }
/* ------------------------------------------------------------------------------------------------------------------ */

/* -------------------------------------------------------Loop------------------------------------------------------- */
While
    = "while" _ "(" _ cond:Expression _ ")" _ stmt:Block {
        return createNode('While', { cond, stmt })
    }

For
    = "for" _ "(" _ init:Statement _ cond:Ternary _ ";" _ update:Expression _ ")" _ stmt:Block {
        return createNode('For', { init, cond, update, stmt })
    }
/* ------------------------------------------------------------------------------------------------------------------ */

/*------------------------------------------------------Switch------------------------------------------------------- */
Switch
    = "switch" _ "(" _ cond:Expression _ ")" _ "{" _ c:Case* _ def:Default? _ "}" {
        return createNode('Switch', { cond, cases: c, def })
    }

Case
    = "case" _ e:Expression _ ":" _ s:Statements* {
        return createNode('Case', { cond: e, stmt: s });
    }

Default
    = "default" _ ":" _ s:Statements* {
        return createNode('Case', { cond: null, stmt: s });
    }
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------Control----------------------------------------------------- */
Break
    = "break" _ ";" { return createNode('Break', {}) }

Continue
    = "continue" _ ";" { return createNode('Continue', {}) }

Return
    = "return" _ exp:Expression _ ";" { return createNode('Return', { exp }) }
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------Expression------------------------------------------------- */

Expression
    = Assignment

Assignment
    =  id:Id _ "[" _ exp1:Expression _ "]" _ "[" _ exp2:Expression _ "]" _ sig:("=" / "+=" / "-=") _ assign:Assignment {
        return createNode('MatAssign', { id, exp1, exp2, sig, assign })
    }
    / id:Id _ "[" _ exp:Expression _ "]" _ sig:("=" / "+=" / "-=") _ assign:Assignment {
        return createNode('VecAssign', { id, exp, sig, assign })
    }
    / id:Id _ sig:("=" / "+=" / "-=") _ assign:Assignment {
        return createNode('VarAssign', { id, sig, assign })
    }
    / id:Id id2:("." id2:Id { return id2 })+ _ sig:("=" / "+=" / "-=") _ assign:Assignment {
        return createNode('StructAssign', { id, id2, sig, assign })
    }
    / Ternary

Ternary
    = cond:OR _ "?" _ trueExp:Ternary _ ":" _ falseExp:Ternary {
        return createNode('Ternary', { cond, trueExp, falseExp })
     }
    / OR
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------Logical----------------------------------------------------- */
OR
    = le:AND expansion:(
        _ "||" _ ri:AND { return { type: '||', ri } }
    )* {
        return expansion.reduce(
            (acc, curr) => {
                const { type, ri } = curr
                return createNode('Logical', { op: type, left: acc, right: ri })
            },
            le
        )
    }

AND
    = le:Equality expansion:(
        _ "&&" _ ri:Equality { return { type: '&&', ri } }
    )* {
        return expansion.reduce(
            (acc, curr) => {
                const { type, ri } = curr
                return createNode('Logical', { op: type, left: acc, right: ri })
            },
            le
        )
    }
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------Relational-------------------------------------------------- */
Equality
    = le:Relational expansion:(
        _ op:("==" / "!=") _ ri:Relational { return { type: op, ri } }
    )* {
        return expansion.reduce(
            (acc, curr) => {
                const { type, ri } = curr
                return createNode('Relational', { op: type, left: acc, right: ri })
            },
            le
        )
    }

Relational
    = le:Sum expansion:(
        _ op:("<=" / ">=" / "<" / ">") _ ri:Sum { return { type: op, ri } }
    )* {
        return expansion.reduce(
            (acc, curr) => {
                const { type, ri } = curr
                return createNode('Relational', { op: type, left: acc, right: ri })
            },
            le
        )
    }
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------Arithmetic-------------------------------------------------- */
Sum
    = le:Mul expansion:(
        _ op:("+" / "-") _ ri:Mul { return { type: op, ri } }
    )* {
        return expansion.reduce(
            (acc, curr) => {
                const { type, ri } = curr
                return createNode('Arithmetic', { op: type, left: acc, right: ri })
            },
            le
        )
    }

Mul
    = le:Unary expansion:(
        _ op:("*" / "/") _ ri:Unary { return { type: op, ri } }
    )* {
        return expansion.reduce(
            (acc, curr) => {
                const { type, ri } = curr
                return createNode('Arithmetic', { op: type, left: acc, right: ri })
            },
            le
        )
    }


Unary
    = "-" _ dt:DataType { return createNode('Unary', { op: '-', exp: dt }) }
    / "!" _ dt:DataType { return createNode('Unary', { op: '!', exp: dt }) }
    / DataType
/* ------------------------------------------------------------------------------------------------------------------ */

/* -----------------------------------------------------DataType----------------------------------------------------- */
DataType
    = Number
    / Boolean
    / String
    / Char
    / Null
    / Group
    / VecMethods
    / IdValue

VecMethods
    = IndexOf
    / Join
    / Length

IndexOf
    = id:Id "." "indexOf" _ "(" _ exp:Expression _ ")" {
            return createNode('VecIndexOf', { id, exp })
    }
    / id:Id _ "[" _ exp:Expression _ "]" "." "indexOf" _ "(" _ exp2:Expression _ ")" {
            return createNode('MatIndexOf', { id, exp, exp2 })
    }

Join
    = id:Id "." "join" _ "(" _ ")" {
            return createNode('VecJoin', { id })
    }
    / id:Id _ "[" _ exp:Expression _ "]" "." "join" _ "(" _ ")" {
            return createNode('MatJoin', { id, exp })
    }

Length
    = id:Id "." "length" {
            return createNode('VecLength', { id })
    }
    / id:Id _ "[" _ exp:Expression _ "]" "." "length" {
            return createNode('MatLength', { id, exp })
    }


IdValue
    = id:Id _ "[" _ exp1:Expression _ "]" _ "[" _ exp2:Expression _ "]" {
        return createNode('MatValue', { id, exp1, exp2 })
    }
    / id:Id _ "[" _ exp:Expression _ "]" {
        return createNode('VecValue', { id, exp })
    }
    / id:Id {
        return createNode('VarValue', { id })
    }

Group
    = "(" _ exp:Expression _ ")" { return createNode('Group', { exp }) }

Number
    = Float
    / Integer

Integer
    = [0-9]+ {
        return createNode('Literal', { value: parseInt(text()), type: 'int' })
    }

Float
    = [0-9]+ "." [0-9]+ {
        return createNode('Literal', { value: parseFloat(text(), 10), type: 'float' })
     }

Boolean
    = ("true" / "false") {
        return createNode('Literal', { value: text() === "true" ? true : false, type: 'bool' })
     }

String
    = "\"" [^\"]* "\"" {
        return createNode('Literal', { value: text().slice(1, -1), type: 'string' })
     }

Char
    = "'" [^']* "'" {
        return createNode('Literal', { value: text().slice(1, -1), type: 'char' })
     }

Null
    = "null" {
        return createNode('Literal', { value: null, type: 'null' })
    }

/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------Comment----------------------------------------------------- */
Comment
    = SimpleComment
    / BlockComment

SimpleComment
    = "//" (!EndComment .)* EndComment  { console.log("SimpleComment", text()); }

EndComment
    = "\r" / "\n" / "\r\n" / !.

BlockComment
    = "/*" (!"*/" .)* "*/"      { console.log("BlockComment", text()); }

_
    = [ \t\n\r]*
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------Keywords---------------------------------------------------- */
Types
    = ("int" / "float" / "bool" / "string" / "char" / "void") { return text(); }

Id
    = [a-zA-Z_][a-zA-Z0-9_]* { return text(); }
/* ------------------------------------------------------------------------------------------------------------------ */