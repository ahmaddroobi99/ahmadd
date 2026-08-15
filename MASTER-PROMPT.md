# Master Portfolio Redesign Prompt — Ahmad Droobi
## Complete, Standalone Brief for AI Design/Frontend Tools

Copy this entire block and paste into Claude, Cursor, v0.dev, GPT, Lovable, Framer AI, or any code generation tool.

---

## CONTEXT & IDENTITY

You are designing and building a complete, production-ready portfolio website for **Ahmad Droobi**.

**Current Role:** Platform Software Engineer  
**Title & Focus:** Robotics Systems · Linux & Docker · Hardware Integration · Deployment & Automation  
**Current Position:** Applications Software Engineer at Lumotive, Vancouver, BC (Nov 2025–Present)  
**Previous:** Research Assistant in State Estimation & Autonomous Systems, University of Calgary (2023–2025, MSc Computer Engineering, GPA 3.8/4.0)  

**Core Expertise:**
- Real-time ROS2 perception pipelines for solid-state LiDAR vision systems
- High-performance C++/Python frameworks for robotic platforms
- Sensor fusion, adaptive calibration, hardware integration (cameras, LiDAR, NVIDIA GPU)
- Production deployment, CI/CD pipelines, Docker, Linux/Ubuntu systems
- Distributed state estimation, HPC (MPI/Slurm), automation & reliability engineering

**Contact:**
- Email: ahmad.droobi1999@gmail.com
- Phone: (672) 377-0203
- LinkedIn: linkedin.com/in/droobi
- GitHub: github.com/ahmaddroobi99
- Location: Vancouver, BC | Authorized to work in Canada

---

## DESIGN GOALS

1. **Modern, distinctive visual language** — not generic academic template or overused SaaS dark-mode
2. **Clean, high-signal, technical aesthetic** — suitable for robotics/platform software recruiters AND research audiences
3. **Excellent hierarchy, generous whitespace, refined typography** — feels like a top-tier engineer's site
4. **Dark/light mode support** with system preference detection
5. **Fully responsive** (desktop → tablet → mobile), accessible (WCAG AA)
6. **Fast, smooth interactions** — section scroll + active nav highlighting
7. **Single-page primary experience** with optional deep-dive pages
8. **Dedicated printable one-page résumé** (/resume or /cv)
9. **GitHub projects section stays automatically up-to-date**

---

## INFORMATION ARCHITECTURE

### Primary: Single-Page Site (Smooth Scroll + Sticky Nav)

1. **Navigation** (sticky/floating)
   - Logo/name
   - Links: About · Experience · Projects · Skills · Resume · Contact
   - Dark/light mode toggle

2. **Hero Section**
   - Name: "Ahmad Droobi"
   - Title: "Platform Software Engineer"
   - Subtitle: "Robotics · Perception Systems · Linux & Deployment"
   - Tagline: "Building reliable vision platforms that power autonomous robots in production"
   - CTAs: [Download Résumé] [View Work] [Contact]
   - Optional: subtle technical accent (restrained LiDAR particle visualization or precision grid)

3. **About**
   - Professional narrative (2–3 sentences)
   - Bridge: "I design and build robust platform software that powers reliable, scalable robotic vision systems. With hands-on experience at Lumotive integrating vision hardware into production Linux/Docker environments, plus strong C++/Python skills in deployment, automation, and hardware integration, I bridge low-level systems with real-world robotics."
   - Key interests: state estimation, sensor fusion, distributed systems, hardware validation

4. **Experience** (Timeline or Refined Cards)
   ```
   Applications Software Engineer — Lumotive (Nov 2025 – Present)
   • Designed and implemented ROS2-based real-time perception pipelines…
   • Built scalable end-to-end sensor architectures…
   • Developed production-grade deployment tools, PyTest suites, CI/CD pipelines…
   • Collaborated cross-functionally with firmware, optics, robotics teams…
   
   Research Assistant, State Estimation & Autonomous Systems — University of Calgary (Sep 2023 – Aug 2025)
   • Developed distributed high-dimensional state estimation frameworks using C++/Python…
   • Architected automated pipelines for large-scale experiments…
   • Designed and maintained Linux-based development and testing environments…
   • Mentored graduate students in robotics and numerical methods…
   
   Machine Learning Engineer Intern — Harri (Jan 2022 – Jan 2023)
   • Built real-time computer vision systems (Python/OpenCV)…
   • Architected automated data-to-deployment workflows…
   • Collaborated on scalable system integration…
   ```

5. **Selected Technical Projects**
   - **Robotic CNC Pick-and-Place System** (2022–2023)
     - Python · OpenCV · Arduino · Linux
     - High-precision vision-guided robotic manipulation, sub-millimeter accuracy, closed-loop control
   
   - **Distributed Robotics Simulation & Deployment Framework** (2023–2024)
     - C++ · Python · Docker · ROS2
     - Scalable simulation and deployment tools for multi-node robotic systems, hardware-in-the-loop testing
   
   - **+ Dynamic GitHub Projects** (auto-populated from github.com/ahmaddroobi99, filtered and sorted by featured/stars)

6. **Skills & Technical Stack**
   ```
   Platform & Systems
   Linux (Ubuntu) · Docker · Deployment Pipelines · CI/CD · Automation · Reliability & Observability
   
   Hardware Integration
   Vision Cameras · LiDAR/Sensors · NVIDIA GPU Workflows · Network Devices · Robot Controllers · Sensor Fusion
   
   Programming
   Python · C++ · Bash · ROS2
   
   DevOps & Tools
   Docker · CI/CD · PyTest · HPC (MPI/Slurm) · Linux Configuration · Git · Performance Profiling
   
   Domain
   Robotics · Computer Vision · Distributed Systems · Hardware Validation
   ```

7. **Education**
   ```
   MSc Computer Engineering — University of Calgary
   Sep 2023 – Nov 2025 | GPA 3.8/4.0
   Focus: Distributed Systems & Autonomous Robotics
   ```

8. **Contact / Footer**
   - Email, phone, LinkedIn, GitHub links
   - "Let's work together" or similar professional CTA

### Secondary Pages (Optional Deep Dives)
- Full résumé page (/resume)
- Expanded projects page
- Blog or research notes (optional future)

---

## VISUAL DESIGN DIRECTION

### Recommended: "Precision Robotics"
- **Primary palette:** Deep slate/charcoal (#0a1628) or refined light (#f8f9fa)
- **Accent:** Electric teal (#0ea5e9) or soft cyan (#06b6d4) — tech-forward, not purple
- **Secondary:** Muted engineering blue (#1e40af) or warm grey (#6b7280)
- **Typography:** Distinctive display (e.g., Inter, Inconsolata, or custom) + highly readable body (e.g., Inter, Outfit)
- **Aesthetic:** Sophisticated, precise, production-grade; feels like a top-tier platform/robotics engineering site
- **Micro-interactions:** Subtle hover effects, smooth transitions, refined shadows
- **Avoid:** Glassmorphism (unless it adds clarity), heavy 3D, generic AI gradients, cluttered layouts

### Component Examples
- **Project cards:** Clean white/dark boxes with title, description, tech tags, link; hover: subtle lift + glow
- **Timeline:** Vertical line with milestones; cards alternate left/right on desktop, stack on mobile
- **Skill tags:** Small pill-shaped badges, grouped by category
- **Resume highlight:** Card-style sections with strong typography hierarchy

---

## GITHUB PROJECTS AUTOMATION (Future-Proof)

### Data Source
- GitHub user: `ahmaddroobi99`
- Auto-update strategy: GitHub Action (daily) → updates `data/projects.json` → frontend reads static JSON

### Fetch Logic (Node.js script)
```
- Fetch all repos for ahmaddroobi99
- Filter: exclude archived, test, homework, curriculum repos
- Allow important forks (stars > 3 or force-include list)
- Determine "featured" status (stars ≥ 5, has ML/robotics topics, or forced)
- Sort: featured first, then by last updated
```

### JSON Structure
```json
{
  "lastUpdated": "2026-08-15T00:00:00Z",
  "source": "github:ahmaddroobi99",
  "projects": [
    {
      "id": "repo-name",
      "name": "Display Name",
      "description": "Short description",
      "url": "https://github.com/ahmaddroobi99/repo-name",
      "homepage": null,
      "language": "Python",
      "stars": 25,
      "forks": 2,
      "topics": ["robotics", "ml"],
      "updatedAt": "2026-08-15",
      "featured": true,
      "category": "research"
    }
  ]
}
```

### GitHub Action (.github/workflows/update-projects.yml)
- Trigger: daily at 6 AM UTC, or manual dispatch, or on-push
- Steps: checkout, setup Node, run fetch script, commit + push if changed

### Frontend Integration
- Load `data/projects.json` on page load
- Display projects as cards in a grid or filtered list
- Optional: search/filter by language, topic, featured status

---

## ONE-PAGE RÉSUMÉ VIEW

Create a dedicated /resume or /cv page that:
- Uses the same visual language as the main site
- Print-optimized (PDF-export ready)
- Single-column, clean layout
- All content from the provided resume
- "Download PDF" button
- Matches the professional, precise aesthetic

---

## TECHNICAL IMPLEMENTATION

**Recommended Stack:**
- Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion
- OR: Astro + plain HTML/CSS/JS (lighter, fast)
- OR: Pure HTML + CSS + vanilla JS (simplest)

**Key Features:**
- Dark/light mode (system preference + toggle)
- Smooth scroll + active section nav highlighting
- Fully responsive (mobile-first)
- SEO ready (meta tags, Open Graph)
- Fast load times (optimize images, minimize JS)
- Easy to extend (projects auto-loaded, resume easily updateable)

**Deployment:**
- Cloudflare Pages (current) OR Vercel / Netlify
- GitHub-based CI/CD (auto-deploy on push)

---

## DELIVERABLES REQUIRED

1. ✅ Complete working frontend code (HTML/CSS/JS or full component framework)
2. ✅ One-page résumé page (/resume)
3. ✅ `data/projects.json` + example with 3–5 sample projects
4. ✅ GitHub Action + fetch script for automatic updates
5. ✅ Dark/light mode with system preference
6. ✅ Smooth scroll + active nav section highlighting
7. ✅ Fully responsive (tested on mobile/tablet/desktop)
8. ✅ All content from the provided resume accurately reflected
9. ✅ Design system summary (colors, typography, spacing, components)
10. ✅ Deployment instructions

---

## TONE & BRAND VOICE

- **Intelligent, precise, confident, approachable**
- Suitable for both industry recruiters (robotics, platform software) and academic/research audiences
- Professional yet personable
- Showcases deep technical depth without being unapproachable

---

## IMPLEMENTATION NOTES

- Use exact wording from the résumé for experience / skills / projects
- Ensure all links (GitHub, LinkedIn, email) are functional
- Make the site feel like a high-caliber platform/robotics engineer's personal brand
- Support both desktop and mobile equally (not just "mobile-friendly")
- Make adding new projects or updating content simple (edit data/projects.json or resume content)

---

## COPY & PASTE INTO YOUR TOOL

1. Open Claude / Cursor / v0.dev / GPT / Lovable
2. Paste this entire prompt
3. Optionally add: "Use Next.js + Tailwind" or "Pure HTML/CSS" or any specific preference
4. Request: "Generate the complete portfolio frontend code"
5. Let it build the site
6. Deploy to Cloudflare Pages using the provided GitHub Action

---

**This prompt contains everything you need for a complete, modern, future-proof portfolio redesign.**
