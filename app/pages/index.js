import { parse } from '../js/grammar/analyzer.js';
import {InterpreterVisitor} from "../js/ast/interpreter.js";


document.addEventListener('DOMContentLoaded', () => {
    const executeButton = document.getElementById('execute');

    if (executeButton) {
        executeButton.addEventListener('click', () => {
            console.log("Ejecutando...");
            executeAction();
        });
    }
});

function executeAction() {
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        const tabId = activeTab.id;

        const codeArea = document.getElementById(`code-area-${tabId}`);
        if (codeArea) {
            const content = codeArea.value;

            const infoArea = document.getElementById('info-area');
            if (infoArea) {
                infoArea.value = "";
            }

            let errorMessages = [];
            let interpreter; 

            try {
                const exp = parse(content); 
                interpreter = new InterpreterVisitor();

                for (let i = 0; i < exp.length; i++) {
                    try {
                        if (exp[i] !== undefined) {  
                            exp[i].accept(interpreter);
                        }
                    } catch (error) {
                        let errorMessage = `Error capturado en el elemento ${i}: ${error.message}`;
                        errorMessages.push(errorMessage);
                    }
                }
            } catch (error) {
                let errorMessage = error.message;
                if (error.location) {
                    errorMessage += ` at line ${error.location.start.line}, column ${error.location.start.column}`;
                }
                errorMessages.push(errorMessage);
            }

            let message = "Ejecución terminada.";

            if (errorMessages.length > 0) {
                message = errorMessages.join('\n');
            }

            console.log(message); 

            const consoleOutput = interpreter?.Console || "";
            if (infoArea) {
                infoArea.value = `${message}\n${consoleOutput}`;
            }
        }
    } else {
        alert('No hay ninguna pestaña activa.');
    }
}
