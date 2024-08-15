import { parse } from './grammar/analyzer.js'

document.addEventListener('DOMContentLoaded', () => {
    const executeButton = document.getElementById('execute');

    if (executeButton) {
        executeButton.addEventListener('click', () => {
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

            console.log('Contenido del editor:', content);
            const result = parse(content);
            console.log('Resultado del parser:', result);
            
            const simulatedResponse = `${content}`;

            const infoArea = document.getElementById('info-area');
            if (infoArea) {
                infoArea.value = simulatedResponse;
            }
        }
    } else {
        alert('No hay ninguna pestaña activa.');
    }
}