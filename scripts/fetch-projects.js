const fs = require('fs');
const path = require('path');

const USERNAME = 'ahmaddroobi99';
const TOKEN = process.env.GITHUB_TOKEN;
const OUTPUT = path.join(__dirname, '../data/projects.json');

// Repos to always force-include
const FORCE_INCLUDE = [
    'robotic-cnc-project',
    'distributed-robotics',
];

// Patterns to exclude
const EXCLUDE = [
    /curriculum/i,
    /test/i,
    /homework/i,
    /assignment/i,
    /archive/i,
    /example/i,
];

async function fetchAllRepos() {
    const repos = [];
    let page = 1;

    while (true) {
        const res = await fetch(
            `https://api.github.com/users/${USERNAME}/repos?per_page=100&page=${page}&sort=updated`,
            {
                headers: {
                    Authorization: TOKEN ? `Bearer ${TOKEN}` : undefined,
                    Accept: 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            }
        );

        if (!res.ok) {
            throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        if (data.length === 0) break;

        repos.push(...data);
        page++;
    }

    return repos;
}

function shouldInclude(repo) {
    // Always include force-listed repos
    if (FORCE_INCLUDE.includes(repo.name)) return true;

    // Skip archived repos
    if (repo.archived) return false;

    // Skip repos matching exclusion patterns
    if (EXCLUDE.some(pattern =>
        pattern.test(repo.name) || pattern.test(repo.description || '')
    )) {
        return false;
    }

    // For forks, only include if they have stars or are forced
    if (repo.fork && repo.stargazers_count < 3) return false;

    return true;
}

async function main() {
    console.log(`Fetching repositories for ${USERNAME}...`);

    const raw = await fetchAllRepos();
    console.log(`Found ${raw.length} total repositories`);

    const projects = raw
        .filter(shouldInclude)
        .map(r => ({
            id: r.name,
            name: r.name
                .replace(/[-_]/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase()),
            description: r.description || 'A project by Ahmad Droobi',
            url: r.html_url,
            homepage: r.homepage || null,
            language: r.language,
            stars: r.stargazers_count,
            forks: r.forks_count,
            topics: r.topics || [],
            updatedAt: r.updated_at.slice(0, 10),
            createdAt: r.created_at.slice(0, 10),
            isFork: r.fork,
            featured: FORCE_INCLUDE.includes(r.name) || r.stargazers_count >= 5,
            category: (r.topics?.includes('research') || r.topics?.includes('machine-learning') || r.topics?.includes('robotics'))
                ? 'research'
                : 'project',
        }))
        .sort((a, b) => {
            // Featured projects first
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            // Then by stars
            if (a.stars !== b.stars) return b.stars - a.stars;
            // Then by recent update
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });

    const output = {
        lastUpdated: new Date().toISOString(),
        source: `github:${USERNAME}`,
        count: projects.length,
        projects,
    };

    // Ensure directory exists
    fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });

    // Write JSON
    fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2));

    console.log(`✅ Wrote ${projects.length} projects to ${OUTPUT}`);
    console.log(`   Featured: ${projects.filter(p => p.featured).length}`);
    console.log(`   Total stars: ${projects.reduce((sum, p) => sum + p.stars, 0)}`);
}

main().catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
});
