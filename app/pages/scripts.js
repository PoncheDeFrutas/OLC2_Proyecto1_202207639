document.addEventListener('DOMContentLoaded', () => {
    addTab('Editor');

    document.getElementById('create-tab').addEventListener('click', () => {
        addTab('Editor');
    });

    document.getElementById('toggle-to-single').addEventListener('click', () => {
        document.body.classList.add('single-view');
        document.getElementById('toggle-to-single').style.display = 'none';
        document.getElementById('toggle-to-double').style.display = 'inline-block';

        document.getElementById('create-tab').style.display = 'none';
        document.getElementById('open-file').style.display = 'none';
        document.getElementById('save-file').style.display = 'none';
        document.getElementById('execute').style.display = 'none';
        document.getElementById('report1').style.display = 'inline-block';
        document.getElementById('report2').style.display = 'inline-block';

        document.querySelector('.single-section').style.display = 'flex';
    });

    document.getElementById('toggle-to-double').addEventListener('click', () => {
        document.body.classList.remove('single-view');
        document.getElementById('toggle-to-single').style.display = 'inline-block';
        document.getElementById('toggle-to-double').style.display = 'none';

        document.getElementById('create-tab').style.display = 'inline-block';
        document.getElementById('open-file').style.display = 'inline-block';
        document.getElementById('save-file').style.display = 'inline-block';
        document.getElementById('execute').style.display = 'inline-block';
        document.getElementById('report1').style.display = 'none';
        document.getElementById('report2').style.display = 'none';

        document.querySelector('.single-section').style.display = 'none';
    });
});

document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('close-btn')) {
        const tabId = event.target.parentElement.id;
        closeTab(tabId);
    }
});

function addTab(title) {
    const tabs = document.getElementById('tabs');
    const editorContainer = document.getElementById('editor-container');

    const tabId = `tab-${Date.now()}`;
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.id = tabId;
    tab.innerHTML = `${title} <button class="close-btn">x</button>`;
    tab.addEventListener('click', () => setActiveTab(tabId));
    tabs.appendChild(tab);

    const editorPanel = document.createElement('div');
    editorPanel.className = 'editor-panel';
    editorPanel.id = `editor-${tabId}`;
    editorPanel.innerHTML = `
        <div class="code-editor">
            <div class="line-numbers" id="line-numbers-${tabId}">1</div>
            <textarea id="code-area-${tabId}" class="code-area" oninput="updateLineNumbers('${tabId}')" onscroll="syncScroll('${tabId}')" placeholder="Escribe tu código aquí..."></textarea>
        </div>
    `;
    editorContainer.appendChild(editorPanel);

    setActiveTab(tabId);
}

function setActiveTab(tabId) {
    document.querySelectorAll('.tab, .editor-panel').forEach(el => el.classList.remove('active'));

    const activeTab = document.getElementById(tabId);
    const activePanel = document.getElementById(`editor-${tabId}`);

    if (activeTab) activeTab.classList.add('active');
    if (activePanel) activePanel.classList.add('active');
}

function closeTab(tabId) {
    const tab = document.getElementById(tabId);
    const editorPanel = document.getElementById(`editor-${tabId}`);

    if (tab) tab.remove();
    if (editorPanel) editorPanel.remove();

    const tabs = Array.from(document.querySelectorAll('.tab'));
    let nextTabId = null;

    if (tabs.length > 0) {
        const currentIndex = tabs.findIndex(t => t.id === tabId);
        if (currentIndex > 0) {
            nextTabId = tabs[currentIndex - 1].id;
        } else if (currentIndex < tabs.length - 1) {
            nextTabId = tabs[currentIndex + 1].id;
        }
    }

    if (!nextTabId && tabs.length === 0) {
        addTab('Editor'); // Re-add default tab if none remain
        nextTabId = document.querySelector('.tab').id;
    }

    if (nextTabId) setActiveTab(nextTabId);
}

function syncScroll(tabId) {
    const codeArea = document.getElementById(`code-area-${tabId}`);
    const lineNumbers = document.getElementById(`line-numbers-${tabId}`);
    lineNumbers.scrollTop = codeArea.scrollTop;
}
