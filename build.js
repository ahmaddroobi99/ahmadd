const fs = require('fs');
const path = require('path');

// Create public directory
if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
}

// Copy directories
const dirs = ['css', 'js', 'img', 'fonts', 'files', 'data'];
dirs.forEach(dir => {
    const src = dir;
    const dest = path.join('public', dir);
    if (fs.existsSync(src)) {
        fs.cpSync(src, dest, { recursive: true, force: true });
    }
});

// Copy files
const files = [
    'index.html',
    'resume.html',
    '404.html',
    'robots.txt',
    'sitemap.xml',
    '.nojekyll'
];
files.forEach(file => {
    if (fs.existsSync(file)) {
        fs.cpSync(file, path.join('public', file), { force: true });
    }
});

console.log('✅ Build complete: public/ folder ready for deployment');
