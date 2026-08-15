# Ahmad Droobi - Professional Portfolio

Portfolio deployed on Cloudflare Pages.

## Setup & Deploy

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- Cloudflare account ([Free](https://dash.cloudflare.com/))

### Installation
```bash
npm install
```

### Build
```bash
npm run build
```
Outputs compiled site to `public/` directory.

### Deploy to Cloudflare
```bash
npm run deploy
```

## Development
Watch SASS files for changes:
```bash
npm run dev
```

## Deployment Options

### Option 1: GitHub + Cloudflare (Recommended)
1. Push code to GitHub
2. Connect repo to Cloudflare Pages dashboard
3. Auto-deploys on every push

### Option 2: Wrangler CLI
```bash
npm run deploy
```

### Option 3: Cloudflare Dashboard
Upload `public/` folder directly to Cloudflare Pages.

## Project Structure
```
├── index.html              Homepage
├── education.html
├── experience.html
├── awards.html
├── advising.html
├── publications.html
├── css/                    Stylesheets
├── js/                     JavaScript
├── img/                    Images
├── sass/                   SASS source
├── fonts/                  Web fonts
├── wrangler.toml           Cloudflare config
├── package.json            NPM scripts
└── _redirects              URL routing
```

## Commands
- `npm install` - Install dependencies
- `npm run dev` - Watch SASS files
- `npm run build` - Build for production
- `npm run deploy` - Deploy to Cloudflare

---
**© 2026 Ahmad Droobi** | Deployed on Cloudflare Pages
# ahmadd
