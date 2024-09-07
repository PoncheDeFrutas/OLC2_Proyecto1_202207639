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
            'Callee': nodes.Callee
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
    = vd:VarDeclaration _ ( Comment _ )? { return vd }
    / s:Sentence _ ( Comment _)? { return s }


/* ------------------------------------------------------Declaration------------------------------------------------ */
VarDeclaration
    = type:(Types / "var") _ id:Id _ exp:("=" _ exp:Expression {return exp})? _ ";" {
        return createNode('VarDeclaration', { type, id, value: exp || null })
    }
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------Struct----------------------------------------------------- */

/* ------------------------------------------------------------------------------------------------------------------ */


/* ------------------------------------------------------Matrix----------------------------------------------------- */

/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------Vector----------------------------------------------------- */

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
    = "System.out.println" _ "(" exp:Arguments ")" _ ";" {
        return createNode('Print', { exp })
    }
/* ------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------Block------------------------------------------------------- */
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

Arguments
    = arg:Expression _ args:( "," _ exp:Expression { return exp } )* {
        return [arg, ...args]
    }

Assignment
    = id:Id _ sig:("=" / "+=" / "-=") _ assign:Assignment {
        return createNode('VarAssign', { id, sig, assign })
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
    = "-" _ dt:Unary { return createNode('Unary', { op: '-', exp: dt }) }
    / "!" _ dt:Unary { return createNode('Unary', { op: '!', exp: dt }) }
    / Callee
/* ------------------------------------------------------------------------------------------------------------------ */

Callee = callee:DataType _ params:("(" args:Arguments? ")" {return args})* {
    return params.reduce(
        (callee, args) => {
            return createNode('Callee', { callee , args: args || [] })
        },
        callee
    )
}

/* -----------------------------------------------------DataType----------------------------------------------------- */
DataType
    = Number
    / Boolean
    / String
    / Char
    / Null
    / Group
    / IdValue

IdValue
    = id:Id {
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