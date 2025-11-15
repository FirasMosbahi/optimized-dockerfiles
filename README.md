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

optimized-dockerfiles/
│
├── react-vite/
│ ├── Dockerfile -> Optimized production Dockerfile
│ ├── Dockerfile.basic -> Non-optimized beginner Dockerfile example
│ ├── nginx.conf -> Static server config
│ └── README.md -> Project-specific guide
│
├── node-api/ -> (upcoming)
├── python-flask/ -> (upcoming)
├── go-service/ -> (upcoming)
└── ...


Each subfolder represents a **standalone example project**, with:

- An **optimized Dockerfile**
- A **basic Dockerfile** (for comparison)
- Configuration files (Nginx, etc.)
- A project-specific README

---

## 🛠️ Technologies Covered (Current & Upcoming)

| Category | Stack | Status |
|---------|--------|--------|
| Frontend | React + Vite | ✅ DONE |
| Backend | Node.js (Express/Fastify) | 🔜 Coming soon |
| Backend | Go | 🔜 Coming soon |
| Backend | Python Flask | 🔜 Coming soon |
| Databases | MongoDB/Postgres containerization patterns | 🔜 Coming soon |
| Deployment | Nginx, Traefik, Caddy | 🔜 Coming soon |

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
