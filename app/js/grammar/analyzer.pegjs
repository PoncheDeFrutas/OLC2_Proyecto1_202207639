{
    const createNode = (typeNode, props) => {
        const type = {
            'Literal': nodes.Literal,
            'Unary': nodes.UnaryOperation,
            'Arithmetic': nodes.ArithmeticOperation,
            'Relational': nodes.RelationalOperation,
            'Logical': nodes.LogicalOperation,
            'Group': nodes.Group,
            'VarDeclaration': nodes.VariableDeclaration,
            'Print': nodes.Print,
            'Assignment' : nodes.Assignment,
            'ExpressionStatement': nodes.ExpressionStatement,
            'VarValue': nodes.VariableValue,
            'Ternary': nodes.TernaryOperation,
            'Block': nodes.Block
        }

        const node = new type[typeNode](props)
        node.location = location()
        return node
    }
}

Program
    = _ ( Comment )? s:Statement* _ { return s }

Statement
    = vd:VarDeclaration _ ( Comment _ )? { return vd }
    / s:Sentence _ ( Comment _)? { return s }
    / Comment _ { return undefined }


VarDeclaration
    = type:(Types / "var") _ id:Id _ exp:("=" _ exp:Expression {return exp})? _ ";" {
    return createNode('VarDeclaration', { type, id, value: exp || null }) }





Sentence
    = p:Print _ { return p }
    / b:Block _ { return b }
    / e:Expression _ { return createNode('ExpressionStatement', { exp: e }) }

Print
    = "System.out.println" _ "(" _ exp:Expression _ ")" _ ";" { return createNode('Print', { exp }) }

Block
    = "{" _ s:Statement* _ "}" { return createNode('Block', { statements: s }) }






Expression
    = Assignment


Assignment
    = id:Id _ sig:("=" / "+=" / "-=") _ assign:Assignment { return createNode('Assignment', { id, sig, assign }) }
    / Ternary

Ternary
    = cond:OR _ "?" _ trueExp:OR _ ":" _ falseExp:OR { return createNode('Ternary', { cond, trueExp, falseExp }) }
    / OR

/* ------------------------------------------------------Logical----------------------------------------------------- */
OR
    = le:AND expansion:(
        _ "||" _ ri:AND { return { type: '||', ri } }
    )* {
        return expansion.reduce(
            (acc, curr) => {
                const { type, ri } = curr
                return createNode('Logical', { op: type, le: acc, ri })
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
                return createNode('Logical', { op: type, le: acc, ri })
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
                return createNode('Relational', { op: type, le: acc, ri })
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
                return createNode('Relational', { op: type, le: acc, ri })
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
                return createNode('Arithmetic', { op: type, le: acc, ri })
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
                return createNode('Arithmetic', { op: type, le: acc, ri })
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
    / id:Id { return createNode('VarValue', { id }) }

Group
    = "(" _ exp:Expression _ ")" { return createNode('Group', { exp }) }

Number
    = Float
    / Integer

Integer
    = [0-9]+ { return createNode('Literal', { value: parseInt(text()), type: 'int' }) }

Float
    = [0-9]+ "." [0-9]+ { return createNode('Literal', { value: parseFloat(text(), 10), type: 'float' }) }

Boolean
    = ("true" / "false") { return createNode('Literal', { value: text() === "true" ? true : false, type: 'bool' }) }

String
    = "\"" [^\"]* "\"" { return createNode('Literal', { value: text().slice(1, -1), type: 'string' }) }

Char
    = "'" [^']* "'" { return createNode('Literal', { value: text().slice(1, -1), type: 'char' }) }

Null
    = "null" { return createNode('Literal', { value: null, type: 'null' })
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
    = ("int" / "float" / "bool" / "string" / "char" / "void" / "null") { return text(); }

Id
    = [a-zA-Z_][a-zA-Z0-9_]* { return text(); }
/* ------------------------------------------------------------------------------------------------------------------ */