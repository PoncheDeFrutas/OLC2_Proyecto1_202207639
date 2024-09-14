# Manual de Usuario para el Proyecto de Interprete y Analizador de Código

## Descripción del Proyecto

Este proyecto es una herramienta de análisis e interpretación de código en JavaScript. Permite a los usuarios ejecutar código, visualizar el estado de las variables, generar informes en formato HTML, y manejar archivos de código con extensión `.oak`. El proyecto incluye un editor de código, un intérprete de código, y una interfaz de usuario para la visualización y gestión de la información.

## Estructura del Proyecto

El proyecto está compuesto por los siguientes módulos principales:

- **`index.js`**: Archivo principal que maneja la ejecución del código, la actualización de la interfaz y el manejo de errores.
- **`file-handler.js`**: Módulo que gestiona la apertura, guardado y administración de archivos `.oak`.
- **`InterpreterVisitor`**: Clase encargada de interpretar y ejecutar el código, así como de generar un informe en formato HTML.
- **`VariableTracker`**: Clase que rastrea las variables y genera una tabla HTML con la información de las variables.
- **`parse`**: Función personalizada para analizar el código.

## Funcionalidades

### Ejecución de Código

El archivo `index.js` maneja la ejecución del código cuando se hace clic en el botón 'Ejecutar'. La función `parse` se utiliza para analizar el código y la clase `InterpreterVisitor` se encarga de la ejecución y manejo de errores.

### Visualización de Variables

La clase `InterpreterVisitor` incluye un método `toHtmlTable` que genera una tabla HTML con la información de las variables. Esta tabla se muestra en una sección específica de la aplicación.

### Manejo de Archivos

El módulo `file-handler.js` permite a los usuarios abrir, guardar y gestionar archivos `.oak`. También maneja la sincronización de números de línea y posiciones de desplazamiento en los editores de código.

### Informes HTML

El método `toHtmlTable` de la clase `InterpreterVisitor` genera un informe en formato HTML que representa las variables rastreadas durante la ejecución del código. Este informe se puede visualizar en una sección de la aplicación.

## Clases y Métodos

### Clase `InterpreterVisitor`

- **Constructor**
    - Inicializa el entorno global, registra funciones nativas y configura la salida de consola.

- **Métodos**
    - `visitExpression(node)`: Visita un nodo de expresión.
    - `visitLiteral(node)`: Visita un nodo literal.
    - `visitArithmetic(node)`: Realiza una operación aritmética.
    - `visitRelational(node)`: Realiza una operación relacional.
    - `visitLogical(node)`: Realiza una operación lógica.
    - `visitUnary(node)`: Realiza una operación unaria.
    - `visitPrint(node)`: Actualiza la salida de consola.
    - `visitBlock(node)`: Ejecuta un bloque de código.
    - `visitIf(node)`: Ejecuta una declaración `if`.
    - `visitCase(node)`: Ejecuta una declaración `case`.
    - `visitSwitch(node)`: Ejecuta una declaración `switch`.
    - `visitWhile(node)`: Ejecuta un bucle `while`.
    - `visitFor(node)`: Ejecuta un bucle `for`.
    - `visitVarDeclaration(node)`: Declara una variable.
    - `visitVarAssign(node)`: Asigna un valor a una variable.
    - `visitReturn(node)`: Devuelve un valor desde una función.
    - `visitBreak(node)`: Rompe un bucle o switch.
    - `visitContinue(node)`: Continua con la siguiente iteración de un bucle.
    - `visitInvocable(node)`: Llama a una función.
    - `visitOutsiderFunction(node)`: Llama a una función externa.
    - `visitStruct(node)`: Define una nueva estructura.
    - `visitAbstractInstance(node)`: Crea una instancia de una estructura abstracta.
    - `visitArrayList(node)`: Crea una nueva lista de arreglos.
    - `visitArrayListInstance(node)`: Manipula una instancia de lista de arreglos.
    - `toHtmlTable()`: Genera una tabla HTML de las variables rastreadas.

### Clase `VariableTracker`

- **Métodos**
    - `trackVariable(name, type, scope, location)`: Rastrea una variable.
    - `getVariables()`: Obtiene todas las variables rastreadas.
    - `clear()`: Limpia el rastreador de variables.
    - `toHtmlTable()`: Genera una tabla HTML de las variables rastreadas.

## Uso

1. **Abrir y Guardar Archivos**
    - Usa el módulo `file-handler.js` para abrir y guardar archivos `.oak`.

2. **Ejecutar Código**
    - Escribe o pega tu código en el editor y haz clic en el botón 'Ejecutar' para analizar y ejecutar el código.

3. **Ver Variables**
    - Después de ejecutar el código, la tabla HTML con la información de las variables se mostrará en la sección de informes.

4. **Generar Informes**
    - La información sobre las variables se presenta en un informe HTML generado por el método `toHtmlTable`.

### Archivos y Estructura
- `js/ast/`: Contiene archivos relacionados con el entorno, el intérprete, los nodos del AST, y más.
- `js/expressions/`: Incluye expresiones aritméticas, lógicas, relacionales y unarias.
- `js/grammar/`: Archivos para el análisis de gramática y configuración.
- `js/instructions/`: Instrucciones para manejo de estructuras, funciones y transferencia de control.
- `js/reports/`: Informes de errores y símbolos.
- `pages/`: Manejo de archivos y ejecución de scripts.
- `css/`: Archivos de estilos CSS.

## Enlaces Útiles

- [Intérprete](index.html): Accede a la interfaz del intérprete de código.
- [Documentación](docs/index.html): Consulta la documentación generada automáticamente para el proyecto.



## Eliminación de Funcionalidades

Las funcionalidades relacionadas con los botones 'Vista Única' y 'Vista Doble' han sido eliminadas del proyecto, y los botones de informe están siempre visibles.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir al proyecto, por favor abre un *pull request* con tus cambios.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

---

Para cualquier pregunta o problema, no dudes en abrir un *issue* en el repositorio del proyecto.

