const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const app = express();
const PORT = 5000;

app.use(express.static('public'));

function readMarkdownFiles(dir) {
  const files = fs.readdirSync(dir);
  const prompts = {};
  
  files.forEach(file => {
    if (file.endsWith('.md') && file !== 'README.md') {
      const category = file.replace('.md', '');
      const content = fs.readFileSync(path.join(dir, file), 'utf-8');
      prompts[category] = content;
    }
  });
  
  return prompts;
}

function readGPTPrompts() {
  const gptsDir = path.join(__dirname, 'gpts');
  const files = fs.readdirSync(gptsDir);
  const prompts = [];
  
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const name = file.replace('.md', '');
      prompts.push({
        id: name,
        name: name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        filename: file
      });
    }
  });
  
  return prompts.sort((a, b) => a.name.localeCompare(b.name));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/categories', (req, res) => {
  const categories = readMarkdownFiles(__dirname);
  res.json(Object.keys(categories));
});

app.get('/api/category/:name', (req, res) => {
  const categoryFile = path.join(__dirname, `${req.params.name}.md`);
  if (fs.existsSync(categoryFile)) {
    const content = fs.readFileSync(categoryFile, 'utf-8');
    res.json({ content: marked(content) });
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

app.get('/api/prompts', (req, res) => {
  const search = req.query.search?.toLowerCase() || '';
  const prompts = readGPTPrompts();
  
  if (search) {
    const filtered = prompts.filter(p => p.name.toLowerCase().includes(search));
    res.json(filtered);
  } else {
    res.json(prompts);
  }
});

app.get('/api/prompt/:id', (req, res) => {
  const promptFile = path.join(__dirname, 'gpts', `${req.params.id}.md`);
  if (fs.existsSync(promptFile)) {
    const content = fs.readFileSync(promptFile, 'utf-8');
    res.json({ content: marked(content) });
  } else {
    res.status(404).json({ error: 'Prompt not found' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`GPT Prompts Browser running on http://0.0.0.0:${PORT}`);
});
