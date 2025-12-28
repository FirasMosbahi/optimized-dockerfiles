# 🟠 SvelteKit — Production Docker Setup

This project demonstrates how to containerize a **SvelteKit SSR** application using an **optimized multi-stage Dockerfile**, along with a **non-optimized basic version** for educational comparison.

It is part of the **Optimized Dockerfiles** collection:
👉 https://github.com/FirasMosbahi/optimized-dockerfiles

---

## 🎯 Purpose of This Example

- Show best practices for running **SvelteKit SSR in production**
- Compare optimized vs non-optimized Dockerfiles
- Demonstrate multi-stage builds for frontend + backend hybrid frameworks
- Provide DevOps-ready patterns for CI/CD pipelines

---

## 📁 Files in This Project

```txt
sveltekit/
│
├── Dockerfile -> Optimized production Dockerfile
├── Dockerfile.basic -> Non-optimized Dockerfile
├── src/ -> SvelteKit source code
├── build/ -> SSR build output (generated)
└── svelte.config.js -> Using @sveltejs/adapter-node
```

---

## 🚀 Build the optimized image

```bash
docker build -t sveltekit-app:prod .
```

Run it:

```bash
docker run -p 3000:3000 sveltekit-app:prod
```

---

## 🏗️ Optimized Production Architecture

The optimized Dockerfile uses:

### ✔ Multi-stage build

- Stage 1 → build SvelteKit

- Stage 2 → run clean Node server with SSR output

### ✔ Alpine + tini

- Smaller footprint

- Proper shutdown behavior

### ✔ No devDependencies

- Smaller attack surface

- Smaller image

### ✔ Great for CI/CD

- Smaller images → faster pipelines

- Deterministic builds

---

## 🧪 Benchmarks

| Metric        | Optimized | Basic          |
| ------------- | --------- | -------------- |
| Image Size    | 70–90 MB  | 800–900 MB     |
| Startup Time  | ~1–2s     | ~8–12s         |
| Security      | High      | Low            |
| Deployability | ✔ SSR     | ❌ preview-only |
| CI/CD Speed   | Fast      | Slow           |

---

## 📜 License

MIT License — free to use and modify.

Made for DevOps learning and container optimization.
By **Firas Mosbahi**.