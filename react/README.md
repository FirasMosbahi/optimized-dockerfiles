# ⚛️ React + Vite — Production Docker Setup

This project demonstrates how to containerize a **Vite + React** application using a **fully optimized production-grade Dockerfile**.  
It also includes a **non-optimized version** for comparison to help understand the DevOps improvements and performance benefits.

---

## 🎯 Purpose of This Example

- Show best practices for building production-ready frontend images.
- Compare optimized vs non-optimized Docker builds.
- Teach static asset serving with **Nginx**, Brotli, and Gzip.
- Provide DevOps-friendly build patterns for CI/CD pipelines.

---

## 📁 Files in This Project

react-vite/
│
├── Dockerfile -> Optimized multi-stage production Dockerfile
├── Dockerfile.basic -> Simple non-optimized Dockerfile (for comparison)
├── nginx.conf -> Nginx static file configuration
├── dist/ -> Build output (generated)
└── src/ -> React source code


---

## 🚀 Build the optimized image

```bash
docker build -t react-vite-app:prod .
```

---

## 🏗️ Optimized Production Docker Architecture

The optimized Dockerfile uses:

- ✔ Multi-stage build

  - Stage 1: Node (build React app)

  - Stage 2: Nginx (serve static files)

- ✔ Alpine-based images

  - Small and secure.

- ✔ Static file serving via Nginx

  - Extremely fast

  - Brotli & gzip

  -Aggressive caching for /assets

- ✔ Minimal final image

  - Only contains the built static files + Nginx.

- ✔ DevOps advantages

  - Smaller images → faster CI/CD

  - Deterministic builds

  - CDN-friendly caching

  - Better security posture

---

## 🧪 Benchmarks

| Metric          | Optimized | Basic      |
| --------------- | --------- | ---------- |
| Image Size      | ~15–25 MB | 400–600 MB |
| Startup Time    | ~1–2s     | ~8–10s     |
| Security        | High      | Low        |
| Caching (Nginx) | ✔ Yes     | ❌ No       |
| Brotli/Gzip     | ✔ Yes     | ❌ No       |
| CI/CD Speed     | Fast      | Slow       |

---

## 📜 License

MIT License — free to use and modify.

Made for DevOps learning and container optimization.

By **Firas Mosbehi**.