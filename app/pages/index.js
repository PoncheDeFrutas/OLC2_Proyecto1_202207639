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
            
            
            const exp = parse(content);
            const interpreter = new InterpreterVisitor()
            let errorMessages = [];

            for (let i = 0; i < exp.length; i++) {
                try {
                    if (exp[i] != null) {
                        exp[i].accept(interpreter);
                    }
                } catch (error) {
                    let errorMessage = `Error capturado en el elemento ${i}: ${error.message}`;
                    errorMessages.push(errorMessage);
                }
            }
            
            let message = "Ejecución terminada.";

            if (errorMessages.length > 0) {
                message = errorMessages.join('\n'); 
            }

            document.getElementById('info-area').value = message+ "\n" +interpreter.Console;
        }
    } else {
        alert('No hay ninguna pestaña activa.');
    }
}