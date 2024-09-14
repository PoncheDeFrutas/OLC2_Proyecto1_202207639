document.addEventListener('DOMContentLoaded', () => {
    const openFileButton = document.getElementById('open-file');
    const fileInput = document.getElementById('file-input');
    const saveFileButton = document.getElementById('save-file');

    if (openFileButton && fileInput) {
        openFileButton.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (event) => {
            const files = event.target.files;

            Array.from(files).forEach(file => {
                if (file.name.endsWith('.oak')) {
                    const reader = new FileReader();

                    reader.onload = function(e) {
                        const fileContent = e.target.result;
                        addTabWithContent(fileContent, file.name.replace('.oak', ''));
                    };

                    reader.onerror = function() {
                        alert('Error al leer el archivo.');
                    };

                    reader.readAsText(file);
                } else {
                    alert('Por favor, selecciona archivos con la extensión .oak');
                }
            });
        });
    } else {
        console.error('No se encontraron los elementos necesarios para manejar archivos.');
    }

    if (saveFileButton) {
        saveFileButton.addEventListener('click', () => {
            saveFile();
        });
    }
});

function addTabWithContent(content, tabTitle) {
    const tabs = document.getElementById('tabs');
    const editorContainer = document.getElementById('editor-container');

    const tabId = `tab-${Date.now()}`;
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.id = tabId;
    tab.innerHTML = `${tabTitle} <button class="close-btn" onclick="closeTab('${tabId}')">x</button>`;
    tab.addEventListener('click', () => setActiveTab(tabId));
    tabs.appendChild(tab);

    const editorPanel = document.createElement('div');
    editorPanel.className = 'editor-panel';
    editorPanel.id = `editor-${tabId}`;
    editorPanel.innerHTML = `
        <div class="code-editor">
            <div class="line-numbers" id="line-numbers-${tabId}">1</div>
            <textarea id="code-area-${tabId}" class="code-area" oninput="updateLineNumbers('${tabId}')" onscroll="syncScroll('${tabId}')" placeholder="Escribe tu código aquí...">${content}</textarea>
        </div>
    `;
    editorContainer.appendChild(editorPanel);

    setActiveTab(tabId);

    updateLineNumbers(tabId);
}

function saveFile() {
    const activeTab = document.querySelector('.tab.active');
    const activeTabId = activeTab ? activeTab.id : null;

    if (activeTabId) {
        const content = document.getElementById(`code-area-${activeTabId}`).value;
        const fileName = activeTab.textContent.replace(' x', '') + '.oak';
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    } else {
        alert('No hay ninguna pestaña activa para guardar.');
    }
}

function updateLineNumbers(tabId) {
    const codeArea = document.getElementById(`code-area-${tabId}`);
    const lineNumbers = document.getElementById(`line-numbers-${tabId}`);

    const numberOfLines = codeArea.value.split('\n').length;

    lineNumbers.textContent = '';
    for (let i = 1; i <= numberOfLines; i++) {
        lineNumbers.textContent += i + '\n';
    }
}

function syncScroll(tabId) {
    const codeArea = document.getElementById(`code-area-${tabId}`);
    const lineNumbers = document.getElementById(`line-numbers-${tabId}`);
    lineNumbers.scrollTop = codeArea.scrollTop;
}
