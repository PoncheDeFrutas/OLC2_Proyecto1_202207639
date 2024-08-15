start
    = _ aux* _

aux
    = dataType _
    / Comment _


/* -----------------------------Data Types----------------------------- */
dataType
    = number
    / boolean
    / string
    / char
    / id

number
    = float
    / integer

integer
    = [0-9]+ { console.log("integer", text()); }

float
    = [0-9]+ "." [0-9]+ { console.log("float", text()); }

boolean
    = ("true" / "false") { console.log("boolean", text()); }

string
    = "\"" [^\"]* "\"" { console.log("string", text()); }

char
    = "'" [^']* "'" { console.log("char", text()); }

id
    = [a-zA-Z_][a-zA-Z0-9_]* { console.log("id", text()); }

/* -------------------------------------------------------------------- */

/* ------------------------------Comments------------------------------ */
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
/* -------------------------------------------------------------------- */