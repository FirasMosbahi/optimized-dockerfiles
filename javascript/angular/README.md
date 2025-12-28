# 🅰️ Angular SSR (Angular Universal) — Production Docker Setup

This project demonstrates how to containerize an **Angular Universal (SSR)** application using a fully optimized, production-grade Dockerfile, along with a non-optimized baseline version to highlight DevOps improvements and performance gains.

It includes everything a DevOps engineer needs to run Angular SSR in production using Node.js, Nginx, caching, compression, health checks, and Docker best practices.

---

## 🎯 Purpose of This Example

- Show best practices for building production-ready Angular SSR images.

- Compare optimized vs non-optimized Docker builds.

- Demonstrate separation of concerns:

  - Node.js → SSR server

  - Nginx → caching layer, static asset delivery

- Provide patterns for CI/CD, Kubernetes, and cloud deployments.

- Reduce image size, improve security, optimize performance.

---

## 📁 Project Structure

```
angular/
│
├── Dockerfile              -> Optimized multi-stage SSR + Nginx Dockerfile
├── Dockerfile.basic        -> Non-optimized dockerfile
├── nginx.conf              -> Optimized Nginx config with SSR routing
├── dist/angular/
│   ├── browser/            -> Client-side app
│   └── server/             -> Angular Universal SSR bundle
└── src/                    -> Angular source code
```

---

## 🚀 Build the optimized image

```bash
docker build -t angular-ssr:prod .
```

Run it:

```bash
docker run -p 80:80 angular-ssr:prod
```

The app is now running with:

- Angular SSR rendered via Node.js

- Nginx in front handling caching, gzip, Brotli, and security headers

---

## 🏗️ Optimized Docker Architecture

The production architecture is:

```txt
[ Angular Builder ] → builds browser + server bundles
        │
        ▼
[ Node.js Runtime ] → serves SSR (dist/server/main.js)
        │
        ▼
[Nginx Reverse Proxy] → caching, compression, routing
```

### ✔ Multi-stage build

Separates build and run stages.

### ✔ Small final runtime

Uses Node 20 Alpine + Nginx Alpine.

### ✔ Full SSR support

main.js is executed by Node inside the final container.

### ✔ Static assets served by Nginx

Better caching & performance.

### ✔ Brotli + gzip compression

Speeds up delivery drastically.

### ✔ Security headers included

Hardens your deployment.

### ✔ Works perfectly in Kubernetes

Supports readiness & liveness probes.

---

## 🧪 Benchmarks

| Metric             | Optimized       | Basic Dockerfile   |
| ------------------ | --------------- | ------------------ |
| Image Size         | ~60–120 MB      | 600–800 MB         |
| Startup Time       | Fast (<1s Node) | Slow (3–5s)        |
| SSR Performance    | High            | Medium             |
| Static Asset Speed | Nginx optimized | Slow (Node serves) |
| Brotli/Gzip        | ✔ Yes           | ❌ No               |
| CI/CD Speed        | Fast            | Slow               |
| Security Posture   | Strong          | Weak               |

---

## ⚙️ Nginx Configuration (SSR-aware)

The provided nginx.conf handles:

- Browser asset caching

- Brotli + gzip

- Security headers

- Reverse proxying to Node SSR server

- Fallback to SSR

This ensures perfect SEO & dynamic server rendering.

---

## 📜 License

MIT License — free to use and modify.

Made for DevOps education, container optimization, and frontend performance engineering.

By **Firas Mosbahi**.