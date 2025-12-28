# ⚛️ Next.js — Production Docker Setup

This project demonstrates how to containerize a **Next.js 15 / App Router** application using a fully optimized, production-grade Dockerfile.
It also includes a non-optimized version for comparison—helping you understand how DevOps optimizations improve image size, security, and runtime performance.

## 🎯 Purpose of This Example

- Show best practices for building production-ready fullstack Next.js apps.

- Compare optimized vs non-optimized Docker builds.

- Provide DevOps-friendly patterns suitable for CI/CD pipelines and Kubernetes.

---

## 📁 Files in This Project

```txt
nextjs/
│
├── Dockerfile → Optimized multi-stage Dockerfile (output: standalone)
├── Dockerfile.basic → Non-optimized version for comparison
├── .dockerignore → Reduces build context
├── next.config.js
└── app/ → Next.js App Router pages/components
```

## 🚀 Build the optimized image

```bash
docker build -t nextjs-app:prod .
```

---

## 🏗️ Optimized Production Docker Architecture

The optimized Dockerfile uses:

### ✔ Multi-stage builds

- Stage 1 — Builder

  - Uses Node to install dependencies

  - Builds to standalone output

  - Removes dev dependencies

→ drastically smaller final image

- Stage 2 — Runner

  - Uses distroless or alpine node (depending on your use case)

  - Copies only:

    - .next/standalone

    - .next/static

    - public/

### ✔ Next.js Standalone Output (Best for Docker)

next build + "output": "standalone" produces:

```txt
.next/
  ├── standalone/    -> tiny production server
  └── static/         -> static assets
```

This reduces:

- Dependencies

- Attack surface

- Container size

### ✔ Alpine/Distroless Base Image

- Smaller

- More secure

- Minimal runtime footprint

### ✔ Proper environment variables for production

- NODE_ENV=production

- NEXT_TELEMETRY_DISABLED=1

### ✔ DevOps Advantages

- Tiny final images (80–130 MB vs 800+ MB)

- Faster CI/CD pipelines

- Predictable builds

- Works perfectly with:

  - Docker Compose

  - Kubernetes

  - ArgoCD

  - Cloud Run

  - AWS ECS/EKS

  - Fly.io

  - Render

---

## 🧪 Benchmarks

| Metric           | Optimized | Basic      |
| ---------------- | --------- | ---------- |
| Image Size       | ~80–130MB | 700–900MB  |
| Startup Time     | ~150ms    | ~700ms+    |
| Security         | High      | Low        |
| Static Assets    | ✔ Yes     | ✔ Yes      |
| Dev Dependencies | ❌ Removed | ✔ Included |
| CI/CD Speed      | Fast      | Slow       |

---

## 📜 License

MIT License — free to use, learn from, and modify.

Made for DevOps learning, optimization, and cloud-ready Docker builds.

By **Firas Mosbahi**.