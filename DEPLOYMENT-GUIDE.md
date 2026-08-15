# Modern Portfolio - Deployment Guide

## 🚀 Quick Start

This is a modern single-page portfolio showcasing Platform Software Engineer expertise with automated GitHub project integration.

### Prerequisites
- Git
- Cloudflare account (for Wrangler Pages deployment)
- GitHub account (for Actions automation)

### Local Development

1. **Clone & Open**
   ```bash
   git clone <repo-url>
   cd profilio_cloud_far
   ```

2. **Preview Locally** (Python required, Node.js optional)
   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

3. **Edit Content**
   - HTML: `index.html`, `resume.html`
   - Styles: `css/modern.css` (already compiled CSS, no SASS required)
   - Scripts: `js/modern.js`
   - Data: `data/projects.json` (auto-updated by GitHub Actions)

---

## 📦 File Structure

```
profilio_cloud_far/
├── index.html                          # Main portfolio (single-page app)
├── resume.html                         # Printable resume page
├── css/
│   └── modern.css                      # Complete styling (dark/light mode)
├── js/
│   └── modern.js                       # Theme toggle, projects loader
├── data/
│   └── projects.json                   # Auto-updated project list
├── img/                                # Images and profile photo
├── fonts/                              # Custom fonts
├── files/                              # PDFs and documents
├── scripts/
│   └── fetch-projects.js               # GitHub API script (runs in Actions)
├── .github/workflows/
│   └── update-projects.yml             # GitHub Actions workflow
├── wrangler.toml                       # Cloudflare Pages config
├── package.json                        # Build scripts
├── build.js                            # Asset pipeline
├── _redirects                          # SPA routing
└── README.md                           # Project info
```

---

## 🌐 Deployment Options

### Option 1: Cloudflare Pages (Recommended)

**Setup (One-time)**

1. Install Wrangler globally:
   ```bash
   npm install -g wrangler
   ```

2. Authenticate:
   ```bash
   wrangler login
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

   Or with GitHub integration (auto-deploy on push):
   - Go to Cloudflare Dashboard → Pages
   - Create Project → Connect to Git
   - Link your GitHub repo
   - Set build command: `npm run build`
   - Set output directory: `public/`

**Manual Deploy Later**
```bash
npm run deploy
```

---

### Option 2: GitHub Pages (Quick Alternative)

1. Enable GitHub Pages in repo settings
2. Set source to `main` branch, `/(root)` directory
3. Files deploy automatically

**Note:** Requires adding `public/` directory to git:
```bash
npm run build
git add public/
git commit -m "build: generate public assets"
git push
```

---

### Option 3: Manual Deploy (Any Server)

1. Build locally:
   ```bash
   npm run build
   ```

2. Upload `public/` directory to your server:
   ```bash
   scp -r public/* user@server:/var/www/portfolio/
   ```

---

## 🤖 GitHub Automation (Project Auto-Update)

The portfolio automatically fetches your GitHub projects and displays them on the "Featured Projects" section.

### How It Works

1. **Daily Trigger**: GitHub Action runs at 6 AM UTC
2. **Fetch**: Queries GitHub API for all your repos
3. **Filter**: Excludes archived, test, homework repos
4. **Mark Featured**: Repos with 5+ stars or in the force-include list
5. **Generate**: Creates `data/projects.json`
6. **Auto-Commit**: Pushes changes back to repo

### Enable GitHub Actions

1. Go to repo → Settings → Actions → General
2. Enable "Allow all actions and reusable workflows"
3. Actions automatically run on:
   - Daily schedule (6 AM UTC)
   - Any push to `scripts/fetch-projects.js` or `.github/workflows/update-projects.yml`
   - Manual trigger via GitHub UI

### Customize Which Projects Show

Edit `.github/workflows/update-projects.yml`:

```yaml
# Force-include these repos regardless of stars
FORCE_INCLUDE: ['repo-name-1', 'repo-name-2']

# Exclude patterns
EXCLUDE: [/test/, /homework/, /archive/]
```

Or edit `scripts/fetch-projects.js` directly:

```javascript
const FORCE_INCLUDE = [
  'robotic-cnc-project',
  'distributed-robotics',
  // Add your featured repos here
];
```

### Manual Update

Run fetch script locally:
```bash
node scripts/fetch-projects.js
```

You must have `GITHUB_TOKEN` in environment:
```bash
export GITHUB_TOKEN=<your-github-token>
node scripts/fetch-projects.js
```

**Get a GitHub Token:**
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Scopes needed: `public_repo`
4. Copy token, keep it safe

---

## 🎨 Customization

### Update Content

- **Name/Title**: Edit `index.html` hero section
- **About**: Edit About section in `index.html`
- **Experience**: Edit timeline items in `index.html`
- **Skills**: Edit skill categories in `index.html`
- **Contact Info**: Update email, phone, LinkedIn, GitHub in `index.html`

### Styling

All styling is in `css/modern.css`. CSS Variables at the top:

```css
:root {
    --primary: #0ea5e9;          /* Main accent color */
    --bg-light: #f8f9fa;          /* Light mode background */
    --bg-dark: #0a1628;           /* Dark mode background */
    --text-light: #1a1a1a;        /* Light mode text */
    --text-dark: #f1f5f9;         /* Dark mode text */
}
```

### Dark/Light Mode

Automatically enabled based on system preference. Users can toggle with the moon/sun icon in navbar.

---

## 🔧 Build Commands

```bash
npm run build              # Build & copy assets + fetch projects
npm run fetch-projects    # Fetch GitHub projects only
npm run copy              # Copy assets only
npm run deploy            # Build + deploy to Cloudflare Pages
npm run dev               # Instructions for local dev
```

---

## 📱 Mobile Responsive

Portfolio is fully responsive:
- Desktop: Multi-column grids
- Tablet: 2-column layout
- Mobile: Single column, hamburger menu

No manual changes needed—CSS handles breakpoints.

---

## 🔐 Environment Variables

If using GitHub Actions, no setup needed! GitHub provides `GITHUB_TOKEN` automatically.

For local testing, create `.env`:
```
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
```

Then run:
```bash
node scripts/fetch-projects.js
```

---

## ✅ Verification Checklist

- [ ] Portfolio loads at custom domain
- [ ] Dark/light mode toggle works
- [ ] Resume page prints cleanly (Print/Save as PDF)
- [ ] Projects section displays featured repos
- [ ] Mobile menu opens/closes
- [ ] All contact links work
- [ ] GitHub Actions workflow runs (check Actions tab)
- [ ] `data/projects.json` auto-updates daily

---

## 🐛 Troubleshooting

**Projects not showing?**
- Check `data/projects.json` exists and has content
- Verify `js/modern.js` has no console errors (F12)
- Ensure GITHUB_TOKEN has `public_repo` scope

**Build fails?**
- Check Node.js version: `node --version` (need v16+)
- Run `npm install` to ensure dependencies
- Check `build.js` for file/directory errors

**Deploy fails to Cloudflare?**
- Run `wrangler login` to re-authenticate
- Check `wrangler.toml` syntax (TOML format)
- Ensure `public/` directory exists: `npm run build`

**Dark mode not working?**
- Clear browser cache (Ctrl+Shift+Del)
- Check localStorage: open DevTools → Application → Storage

---

## 📞 Support

For issues:
1. Check browser console (F12) for errors
2. Verify file structure matches above
3. Test locally with `python -m http.server 8000`
4. Check GitHub Actions logs for automation issues

---

## 🎯 Next Steps

1. **Customize content** to your info
2. **Test locally** before deploying
3. **Deploy to Cloudflare Pages** for production
4. **Enable GitHub Actions** for auto-updating projects
5. **Share your portfolio!**

---

**Built for modern, minimal, professional presence with real-time project updates.**
