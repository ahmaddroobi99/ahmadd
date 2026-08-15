// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    loadProjects();
    initSmoothScroll();
});

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const isDark = localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
        document.body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkNow = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
    });
}

// Mobile Navigation
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Highlight active section
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Load Projects from GitHub
async function loadProjects() {
    try {
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        renderProjects(data.projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        renderDefaultProjects();
    }
}

function renderProjects(projects) {
    const grid = document.getElementById('projects-grid');

    const featured = projects.filter(p => p.featured).slice(0, 6);

    grid.innerHTML = featured.map(project => `
        <article class="project-card ${project.featured ? 'featured' : ''}">
            <h3>
                <a href="${project.url}" target="_blank" rel="noopener noreferrer">
                    ${project.name}
                </a>
            </h3>
            <p class="project-description">${project.description}</p>
            <div class="project-meta">
                ${project.language ? `<span>📝 ${project.language}</span>` : ''}
                <span>⭐ ${project.stars}</span>
                <span>📅 ${project.updatedAt}</span>
            </div>
            ${project.topics && project.topics.length ? `
                <div class="project-topics">
                    ${project.topics.slice(0, 3).map(t => `<span class="topic-tag">#${t}</span>`).join('')}
                </div>
            ` : ''}
        </article>
    `).join('');
}

function renderDefaultProjects() {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = `
        <article class="project-card featured">
            <h3><a href="https://github.com/ahmaddroobi99/robotics-cnc-project" target="_blank">Robotic CNC Pick-and-Place</a></h3>
            <p class="project-description">High-precision vision-guided robotic manipulation platform with closed-loop control, achieving sub-millimeter accuracy.</p>
            <div class="project-meta">
                <span>📝 Python</span>
                <span>⭐ 5</span>
                <span>📅 2023-08-15</span>
            </div>
            <div class="project-topics">
                <span class="topic-tag">#robotics</span>
                <span class="topic-tag">#opencv</span>
                <span class="topic-tag">#control</span>
            </div>
        </article>

        <article class="project-card featured">
            <h3><a href="https://github.com/ahmaddroobi99/distributed-robotics" target="_blank">Distributed Robotics Framework</a></h3>
            <p class="project-description">Scalable simulation and deployment tools for multi-node robotic systems with hardware-in-the-loop testing.</p>
            <div class="project-meta">
                <span>📝 C++</span>
                <span>⭐ 8</span>
                <span>📅 2024-08-15</span>
            </div>
            <div class="project-topics">
                <span class="topic-tag">#ros2</span>
                <span class="topic-tag">#docker</span>
                <span class="topic-tag">#distributed</span>
            </div>
        </article>

        <article class="project-card">
            <h3><a href="https://github.com/ahmaddroobi99" target="_blank">More on GitHub →</a></h3>
            <p class="project-description">Explore all projects and contributions on my GitHub profile. Projects auto-update daily from your repository activity.</p>
            <div class="project-meta">
                <span>🔗 github.com/ahmaddroobi99</span>
            </div>
        </article>
    `;
}

// Smooth Scroll (enhanced)
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Active nav link styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary);
    }
    
    body.dark-mode .nav-link.active {
        color: var(--accent);
    }
`;
document.head.appendChild(style);
