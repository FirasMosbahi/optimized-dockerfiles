# 🟩 Vue 3 + Vite — Production Docker Setup

This project demonstrates how to containerize a **Vue 3 + Vite** application using an optimized, production-grade Dockerfile.

It also includes a **non-optimized version** for comparison to highlight DevOps improvements.

---

## 🎯 Purpose

- Show best practices for containerizing Vue.
- Compare optimized vs basic builds.
- Demonstrate Nginx static hosting.
- Teach caching, Brotli, gzip, and multi-stage builds.

---

## 📁 Project Structure

```txt
vue/
│
├── Dockerfile # Optimized Dockerfile
├── Dockerfile.basic # Non-optimized version
├── nginx-config/app.conf # Nginx for SPA
└── src/ # Vue app
```

---

## 🚀 Build optimized image

```bash
docker build -t vue-vite-app:prod .
```

---

## 🧩 Production Architecture

- ✔ Multi-stage build (Node → Nginx)

- ✔ Tiny Alpine images

- ✔ Cached static assets

- ✔ Gzip + Brotli support

- ✔ Minimal 20MB final image

---

## 🧪 Benchmarks

| Metric      | Optimized | Basic      |
| ----------- | --------- | ---------- |
| Image Size  | 15–25 MB  | 400–600 MB |
| Startup     | 1–2s      | ~10s       |
| Brotli      | ✔         | ❌          |
| Caching     | ✔         | ❌          |
| CI/CD Speed | Fast      | Slow       |

---

## 📜 License

MIT — free for DevOps learning.

By **Firas Mosbahi**.