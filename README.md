![Banner](https://github.com/user-attachments/assets/cf63120c-d365-404d-9343-c89400453fa9)

# 🚀 Optimized Dockerfiles Collection

This repository contains a curated set of **production-ready**, **DevOps-focused**, and **highly optimized Dockerfiles** for different kinds of applications and stacks.  
The purpose is to provide learning resources and ready-to-use examples that demonstrate **best practices for containerization**, **image optimization**, and **production deployment**.

## 🎯 Repository Goals

- Provide **real-world Dockerfile examples** for multiple technologies.
- Demonstrate **multi-stage builds**, **image minimization**, and **secure production setups**.
- Compare **optimized** vs **non-optimized** Dockerfiles.
- Offer **DevOps patterns** for CI/CD, caching, static serving, and deployment.
- Serve as a reference for building your own production-grade Docker images.

---

## 📂 Repository Structure

```txt
optimized-dockerfiles/
│
├── javascript/              # JavaScript/TypeScript frameworks
│   ├── react/              # React + Vite
│   ├── nextjs/             # Next.js 15 with App Router
│   ├── angular/            # Angular Universal (SSR)
│   ├── vue/                # Vue 3 + Vite
│   └── svelte/             # SvelteKit
│
├── python/                 # Python frameworks
│   ├── fastapi/            # FastAPI (async API)
│   ├── flask/              # Flask (lightweight web)
│   ├── django/             # Django + DRF (full-featured)
│   └── streamlit/          # Streamlit (data apps)
│
└── .github/workflows/      # CI/CD pipelines
```

Each framework directory contains:

- An **optimized Dockerfile** (multi-stage, production-ready)
- A **basic Dockerfile** (for comparison)
- Configuration files (Nginx, Poetry, etc.)
- A comprehensive **README.md** with benchmarks

---

## 🚀 Quick Start

Navigate to any framework directory and follow its README:

```bash
# JavaScript frameworks
cd javascript/react     # React + Vite SPA
cd javascript/nextjs    # Next.js with SSR
cd javascript/angular   # Angular Universal
cd javascript/vue       # Vue 3 + Vite
cd javascript/svelte    # SvelteKit

# Python frameworks
cd python/fastapi       # FastAPI async API
cd python/flask         # Flask lightweight web
cd python/django        # Django + DRF full-stack
cd python/streamlit     # Streamlit data apps
```

Each directory includes instructions for building and running optimized Docker images.

---

## 📌 Project Progress Tracker

### JavaScript/TypeScript Frameworks

| Framework     | Description                      | Status     | Path                 |
|---------------|----------------------------------|------------|----------------------|
| **React**     | React + Vite (CSR)               | ✅ DONE    | `javascript/react/`  |
| **Next.js**   | Next.js 15 (App Router + SSR)    | ✅ DONE    | `javascript/nextjs/` |
| **Angular**   | Angular Universal (SSR)          | ✅ DONE    | `javascript/angular/`|
| **Vue**       | Vue 3 + Vite (CSR)               | ✅ DONE    | `javascript/vue/`    |
| **SvelteKit** | SvelteKit (SSR)                  | ✅ DONE    | `javascript/svelte/` |

### Python Frameworks

| Framework     | Description                      | Status     | Path                 |
|---------------|----------------------------------|------------|----------------------|
| **FastAPI**   | Modern async API framework       | ✅ DONE    | `python/fastapi/`    |
| **Flask**     | Lightweight web framework        | ✅ DONE    | `python/flask/`      |
| **Django**    | Full-featured + DRF              | ✅ DONE    | `python/django/`     |
| **Streamlit** | Data apps & dashboards           | ✅ DONE    | `python/streamlit/`  |

### Coming Soon

| Language      | Frameworks/Tools                 | Status     |
|---------------|----------------------------------|------------|
| **Node.js**   | Express, Fastify                 | 🔜 Planned |
| **Go**        | Fiber, Gin                       | 🔜 Planned |
| **Rust**      | Axum, Actix                      | 🔜 Planned |

### DevOps Features

| Feature                              | Status         |
|--------------------------------------|----------------|
| Production-grade Nginx configs       | ✅ DONE        |
| Multi-stage Dockerfiles              | ✅ DONE        |
| Non-optimized comparison builds      | ✅ DONE        |
| CI/CD (GitHub Actions)               | ✅ DONE        |
| Generic workflow with smart detection| ✅ DONE        |
| Parallel builds with caching         | ✅ DONE        |
| GitHub Pages documentation site      | 🔄 In Progress |

---

## 🔄 CI/CD Pipeline

This repository uses a **single, generic GitHub Actions workflow** that:

✅ Automatically detects which frameworks changed
✅ Builds only the affected frameworks (efficient)
✅ Runs builds in parallel when multiple frameworks change
✅ Pushes to Docker Hub with proper tagging
✅ Uses layer caching for faster builds
✅ Supports manual builds via workflow dispatch

**Workflow documentation:** [`.github/WORKFLOW.md`](.github/WORKFLOW.md)

### Docker Images

All images are pushed to Docker Hub:
```
<username>/optimized-dockerfiles:<framework>-latest
<username>/optimized-dockerfiles:<framework>-basic-latest
```

**Examples:**
- `optimized-dockerfiles:react-latest` (optimized build)
- `optimized-dockerfiles:react-basic-latest` (non-optimized build)
- `optimized-dockerfiles:django-latest` (optimized build)

---

## 🐳 Docker Philosophy Used in This Repo

This repository follows production-grade principles:

### ✔ Multi-Stage Builds

Reduce final image size by separating build and runtime stages.

### ✔ Minimal Base Images  

Using `alpine`, `scratch`, or distroless where applicable.

### ✔ Static Asset Serving 

Frontend projects use **Nginx** instead of `vite preview`.

### ✔ Security Hardening  

- Non-root users where possible  
- Read-only filesystem  
- Minimal OS footprint  

### ✔ CI/CD Friendly  

All examples are built to:

- Be cache efficient  
- Work well with GitHub Actions  
- Push easily to Docker Hub  

---

## 🔄 CI/CD Integration

Soon you'll find:

- GitHub Actions templates for:
  - Building Docker images  
  - Tagging releases  
  - Pushing to Docker Hub  
  - Multi-platform builds (`amd64`, `arm64`)  

---

## 🤝 Contributions

Feel free to contribute:

- Additional optimized Dockerfiles
- Example microservices
- Improvements & patterns
- Tutorials and notes

---

## 📜 License

MIT License — free to use, modify, and learn from.

---

Made with ❤️ by **Firas Mosbahi**  
Focused on DevOps excellence and reproducible builds.
