let currentPrompts = [];
let currentView = 'prompts';

async function loadPrompts(search = '') {
    try {
        const response = await fetch(`/api/prompts?search=${encodeURIComponent(search)}`);
        currentPrompts = await response.json();
        renderPrompts();
    } catch (error) {
        console.error('Error loading prompts:', error);
        document.getElementById('promptsList').innerHTML = '<div class="loading">Error loading prompts</div>';
    }
}

function renderPrompts() {
    const promptsList = document.getElementById('promptsList');
    
    if (currentPrompts.length === 0) {
        promptsList.innerHTML = '<div class="loading">No prompts found</div>';
        return;
    }
    
    promptsList.innerHTML = currentPrompts.map(prompt => `
        <div class="prompt-card" onclick="loadPrompt('${prompt.id}')">
            <h3>${escapeHtml(prompt.name)}</h3>
        </div>
    `).join('');
}

async function loadPrompt(id) {
    try {
        const response = await fetch(`/api/prompt/${id}`);
        const data = await response.json();
        
        document.getElementById('promptsList').classList.add('hidden');
        document.getElementById('categoryDetail').classList.add('hidden');
        
        const detailDiv = document.getElementById('promptDetail');
        detailDiv.classList.remove('hidden');
        detailDiv.innerHTML = `
            <button class="back-btn" onclick="showPromptsList()">← Back to Prompts</button>
            <div class="prompt-content">${data.content}</div>
        `;
        
        window.scrollTo(0, 0);
    } catch (error) {
        console.error('Error loading prompt:', error);
    }
}

async function loadCategory(category) {
    try {
        const response = await fetch(`/api/category/${category}`);
        const data = await response.json();
        
        document.getElementById('promptsList').classList.add('hidden');
        document.getElementById('promptDetail').classList.add('hidden');
        
        const detailDiv = document.getElementById('categoryDetail');
        detailDiv.classList.remove('hidden');
        detailDiv.innerHTML = `
            <button class="back-btn" onclick="showPromptsList()">← Back to Categories</button>
            <div class="category-content">${data.content}</div>
        `;
        
        window.scrollTo(0, 0);
    } catch (error) {
        console.error('Error loading category:', error);
    }
}

function showPromptsList() {
    document.getElementById('promptDetail').classList.add('hidden');
    document.getElementById('categoryDetail').classList.add('hidden');
    document.getElementById('promptsList').classList.remove('hidden');
    loadPrompts(document.getElementById('searchInput').value);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    loadPrompts(e.target.value);
});

document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const category = e.target.dataset.category;
        if (category === 'prompts') {
            showPromptsList();
        } else {
            loadCategory(category);
        }
    });
});

loadPrompts();
