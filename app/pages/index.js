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
            let errorMessage = ''; 

            try {
                exp.filter(e => e != null).forEach(e => e.accept(interpreter));
            } catch (error) {
                errorMessage = `Error capturado: ${error.message}`;
                document.getElementById('errorDisplay').value = errorMessage;
            }
            

            const simulatedResponse = `${errorMessage}\n${interpreter.Console}`;
            
            if (infoArea) {
                infoArea.value = simulatedResponse;
            }
        }
    } else {
        alert('No hay ninguna pestaña activa.');
    }
}