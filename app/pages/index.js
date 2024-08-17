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

            const exp = parse(content);
            const interpreter = new InterpreterVisitor()
            const result = exp.accept(interpreter)


            const simulatedResponse = `${JSON.stringify(exp, null, 2)} \n ${result.value}`;

            const infoArea = document.getElementById('info-area');
            if (infoArea) {
                infoArea.value = simulatedResponse;
            }
        }
    } else {
        alert('No hay ninguna pestaña activa.');
    }
}