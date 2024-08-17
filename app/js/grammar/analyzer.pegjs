{
    const createNode = (typeNode, props) => {
        const type = {
            'Literal': nodes.Literal,
            'Unary': nodes.UnaryOperation,
            'Arithmetic': nodes.ArithmeticOperation,
            'Relational': nodes.RelationalOperation,
            'Logical': nodes.LogicalOperation,
            'Group': nodes.Group,

        }

        const node = new type[typeNode](props)
        node.location = location()
        return node
    }
}


Expression
    = OR

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


DataType
    = Number
    / Boolean
    / String
    / Char

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

Id
    = [a-zA-Z_][a-zA-Z0-9_]* { return text(); }

_
    = [ \t\n\r]*