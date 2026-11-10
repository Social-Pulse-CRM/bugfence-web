# BugFence Web

Official marketing, documentation, and pricing website for [BugFence](https://github.com/Social-Pulse-CRM/Crawler) — the privacy-first visual bug reporting and AI debugging intelligence platform.

Hosted live on GitHub Pages: **[https://socialpulsecrm.github.io/bugfence-web/](https://socialpulsecrm.github.io/bugfence-web/)**

---

## Quick Start (Run Locally)

### Option 1: Development Server (Hot Reload)

1. Open PowerShell or Terminal in this directory:
   ```bash
   cd d:\Dishu\bugfence-web
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   Or on a specific port (e.g. 3000 or 3100):
   ```bash
   npx next dev -p 3000
   ```

4. Open your browser:
   👉 **[http://localhost:3000](http://localhost:3000)**

---

### Option 2: Production Build & Static Preview

Because this site is deployed as a static export (`output: 'export'`) to GitHub Pages, you can test the exact static output locally:

1. Build and export static assets to `out/`:
   ```bash
   npm run build
   ```

2. Serve the exported static bundle using Node:
   ```bash
   npx serve out -p 3000
   ```

3. Open **[http://localhost:3000](http://localhost:3000)**.

---

### Option 3: Docker / Docker Compose (Nginx Production Container)

A production-ready, unprivileged Nginx container with read-only root filesystem and security hardening is included:

1. Build and start the container:
   ```bash
   docker compose up -d --build
   ```

2. View the site running inside Nginx:
   👉 **[http://localhost:8080](http://localhost:8080)**

3. Health check endpoint:
   👉 **[http://localhost:8080/healthz](http://localhost:8080/healthz)**

4. Stop the container:
   ```bash
   docker compose down
   ```

---

## Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Next.js development server with Turbopack / HMR |
| `npm run build` | Compiles and exports static HTML/CSS/JS to `out/` |
| `npm run typecheck` | Runs strict TypeScript type checking (`tsc --noEmit`) |
| `npm run test` | Runs unit tests (CSP and client-side PII redaction suite) via Vitest |

---

## Project Structure

```text
bugfence-web/
├── .github/workflows/deploy.yml   # Automated GitHub Pages CI/CD deployment
├── public/                        # Static assets, icons, .nojekyll, security.txt
├── src/
│   ├── app/                       # Next.js App Router static pages
│   │   ├── page.tsx               # Home / Landing page
│   │   ├── pricing/               # 4-tier interactive pricing & feature matrix
│   │   ├── security/              # Security whitepaper & DOMFence architecture
│   │   ├── compare/               # Respectful comparison against Jam, Marker, Sentry
│   │   ├── contact/               # Enterprise & sales inquiry form
│   │   └── (legal)/               # Privacy, terms, cookies, DPA, accessibility
│   ├── components/                # Modular UI primitives & layouts
│   ├── content/                   # Content schemas, plans, pricing data
│   ├── features/
│   │   ├── widget-mock/           # Interactive Reporting Studio simulation
│   │   └── redaction-demo/        # Live client-side DOM redaction sandbox
│   └── lib/                       # CSP generator, JSON-LD schemas, env validation
├── Dockerfile                     # Multi-stage static build with unprivileged Nginx
├── docker-compose.yml             # Hardened local container configuration
└── nginx.conf                     # Nginx headers, gzip compression, SPA fallbacks
```

---

## Deployment to GitHub Pages

Every commit pushed to the `main` branch automatically triggers the GitHub Action at `.github/workflows/deploy.yml` which builds, typechecks, tests, and deploys directly to GitHub Pages.
