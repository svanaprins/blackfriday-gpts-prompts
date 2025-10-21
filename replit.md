# GPT Prompts & Jailbreaks Browser

## Overview
This is a web-based browser interface for the GPT Prompts and Jailbreaks collection. The original repository was a collection of markdown files containing thousands of ChatGPT prompts organized by category. This Replit project adds a clean, searchable web interface to browse and view these prompts.

## Project Structure
```
/
├── server.js          # Express server serving the API and static files
├── package.json       # Node.js dependencies
├── public/            # Frontend static files
│   ├── index.html    # Main HTML page
│   ├── style.css     # Styling
│   └── app.js        # Client-side JavaScript
├── gpts/             # Thousands of individual prompt markdown files
├── *.md              # Category files (Programming.md, Marketing.md, etc.)
└── replit.md         # This file
```

## Features
- Browse thousands of GPT prompts in a searchable grid interface
- Category navigation (Programming, Marketing, Academic, etc.)
- Real-time search filtering
- View full prompt details with markdown rendering
- Responsive design with gradient styling

## Technology Stack
- **Backend**: Node.js with Express
- **Frontend**: Vanilla JavaScript, HTML, CSS
- **Markdown Parsing**: marked library
- **Security**: DOMPurify with jsdom for XSS protection

## Recent Changes
- 2025-10-21: Initial Replit setup
  - Created Express server to serve prompts via API
  - Built responsive web interface with search and category navigation
  - Configured workflow to run on port 5000
  - Set up deployment configuration for autoscale
  - Fixed security vulnerabilities:
    - Added DOMPurify sanitization for all markdown-to-HTML conversion to prevent XSS attacks
    - Replaced inline onclick handlers with proper event listeners to handle special characters in filenames
    - Added proper URL encoding for API requests

## Configuration
- **Development Server**: Runs on `0.0.0.0:5000`
- **Deployment**: Configured for autoscale deployment
- **Workflow**: Single "Server" workflow running `npm start`

## User Preferences
None documented yet.

## Project Architecture
The project follows a simple client-server architecture:
1. Express server reads markdown files from the file system
2. API endpoints serve prompt lists and individual prompt content
3. Frontend uses vanilla JavaScript to fetch and display data
4. Markdown content is converted to HTML using the marked library
