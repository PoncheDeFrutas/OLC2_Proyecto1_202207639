import { parse } from '../js/grammar/analyzer.js';
import { InterpreterVisitor } from "../js/ast/interpreter.js";

document.addEventListener('DOMContentLoaded', () => {
    const executeButton = document.getElementById('execute');
    const report1Button = document.getElementById('report1');
    const report2Button = document.getElementById('report2'); 

    if (executeButton) {
        executeButton.addEventListener('click', () => {
            console.log("Ejecutando...");
            executeAction();
        });
    }

    if (report1Button) {
        report1Button.addEventListener('click', () => {
            showReportPopup('report1', 'Reporte 1');
        });
    }

    if (report2Button) {
        report2Button.addEventListener('click', () => {
            showReportPopup('report2', 'Reporte 2');
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
            let interpreter = new InterpreterVisitor();

            try {
                const exp = parse(content);

                for (let i = 0; i < exp.length; i++) {
                    try {
                        if (exp[i] !== undefined) {
                            exp[i].accept(interpreter);
                        }
                    } catch (error) {
                        let errorMessage = `Error capturado en el elemento ${i}: ${error.message}`;
                        if (error.location) {
                            errorMessage += ` at line ${error.location.start.line}, column ${error.location.start.column}`;
                        }
                        errorMessages.push({
                            fullMessage: errorMessage, 
                            messageWithoutLocation: error.message, 
                            location: error.location
                        });
                    }
                }
            } catch (error) {
                let errorMessage = error.message;
                if (error.location) {
                    errorMessage += ` at line ${error.location.start.line}, column ${error.location.start.column}`;
                }
                errorMessages.push({
                    fullMessage: errorMessage, 
                    messageWithoutLocation: error.message, 
                    location: error.location
                });
            }

            let message = "Ejecución terminada.";
            if (errorMessages.length > 0) {
                message = "Errores encontrados:\n" + errorMessages.map(e => e.fullMessage).join('\n');
            }

            console.log(message);

            const consoleOutput = interpreter?.Console || "";
            if (infoArea) {
                infoArea.value = `${consoleOutput}\n${message}\n`;
            }

            const report1 = document.getElementById('report1');
            if (report1) {
                const htmlTable = interpreter?.Symbols.toHtmlTable() || "";
                report1.dataset.htmlTable = htmlTable; 
            }

            const report2 = document.getElementById('report2');
            if (report2) {
                const errorHtmlTable = generateErrorHtmlTable(errorMessages) || "";
                report2.dataset.htmlTable = errorHtmlTable; 
            }
        }
    } else {
        alert('No hay ninguna pestaña activa.');
    }
}

function generateErrorHtmlTable(errors) {
    let html = '<table border="1"><thead><tr>';
    html += '<th>Message</th><th>Line</th><th>Column</th></tr></thead><tbody>';

    errors.forEach(error => {
        html += `<tr>
            <td>${error.messageWithoutLocation}</td> 
            <td>${error.location ? error.location.start.line : 'unknown'}</td>
            <td>${error.location ? error.location.start.column : 'unknown'}</td>
        </tr>`;
    });

    html += '</tbody></table>';
    return html;
}

function showReportPopup(reportId, title) {
    const reportButton = document.getElementById(reportId);
    const htmlTable = reportButton ? reportButton.dataset.htmlTable : "";

    if (htmlTable) {
        const reportWindow = window.open("", title, "width=800,height=600");
        if (reportWindow) {
            reportWindow.document.open();
            reportWindow.document.write(`
                <html>
                <head>
                    <title>${title}</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 20px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        table, th, td {
                            border: 1px solid #ddd;
                        }
                        th, td {
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f4f4f4;
                        }
                    </style>
                </head>
                <body>
                    <h1>${title}</h1>
                    ${htmlTable}
                </body>
                </html>
            `);
            reportWindow.document.close();
        }
    } else {
        alert(`No hay datos para mostrar en el ${title}.`);
    }
}
