# NestJS Docker Optimization

Production-ready NestJS REST API with TypeScript, dependency injection, and optimized Docker setup using multi-stage builds.

## 🎯 Overview

This example demonstrates Docker optimization techniques for NestJS applications - an enterprise-grade TypeScript framework with Angular-like architecture.

## 📊 Image Size Comparison

| Build Type | Image Size | Reduction |
|------------|------------|-----------|
| **Optimized** (multi-stage) | ~180 MB | ✅ Baseline |
| **Basic** (single-stage) | ~600 MB | ❌ 3.3x larger |

## 🏗️ Architecture

### Optimized Dockerfile (Multi-Stage Build)

**Stage 1: Builder**
- Base: `node:20-alpine`
- Installs all dependencies (including devDependencies for build)
- Compiles TypeScript to JavaScript
- Prunes devDependencies after build

**Stage 2: Runtime**
- Base: `node:20-alpine` (fresh, clean image)
- Copies only production dependencies
- Copies compiled JavaScript (dist folder)
- Runs as non-root user
- No TypeScript overhead in production

### Key Optimizations

1. **Multi-stage build** - Separates build and runtime environments
2. **TypeScript compilation** - Only JavaScript in production
3. **Alpine Linux** - Minimal base image
4. **Production-only deps** - devDependencies excluded from final image
5. **Non-root user** - Enhanced security
6. **Dependency injection** - Testable, modular architecture

## 🚀 Quick Start

### Build Optimized Image

```bash
docker build -t nestjs-demo:optimized -f Dockerfile .
```

### Build Basic Image (for comparison)

```bash
docker build -t nestjs-demo:basic -f Dockerfile.basic .
```

### Run Container

```bash
docker run -p 3000:3000 nestjs-demo:optimized
```

### Test Endpoints

```bash
# Health check
curl http://localhost:3000/health

# Root endpoint
curl http://localhost:3000/

# Get all users
curl http://localhost:3000/api/users

# Get user by ID
curl http://localhost:3000/api/users/1

# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'

# Update user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Smith", "email": "john.smith@example.com"}'

# Delete user
curl -X DELETE http://localhost:3000/api/users/1
```

## 📁 Project Structure

```
nestjs/
├── Dockerfile              # Optimized multi-stage build
├── Dockerfile.basic        # Non-optimized single-stage build
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── nest-cli.json           # NestJS CLI configuration
├── .dockerignore           # Files excluded from Docker build
├── .gitignore              # Files excluded from Git
└── src/
    ├── main.ts             # Application entry point
    ├── app.module.ts       # Root module
    ├── app.controller.ts   # Root controller
    ├── app.service.ts      # Root service
    └── users/
        ├── users.module.ts      # Users feature module
        ├── users.controller.ts  # Users controller
        ├── users.service.ts     # Users service
        └── dto/
            ├── create-user.dto.ts
            └── update-user.dto.ts
```

## 🔧 Features

### NestJS Architecture
- **Modular Design** - Feature-based modules
- **Dependency Injection** - Inversion of Control (IoC)
- **Decorators** - TypeScript decorators for routing, DI, etc.
- **TypeScript** - Full type safety
- **Express Under the Hood** - Familiar HTTP layer

### Built-in Features
- **Controllers** - Handle HTTP requests
- **Services** - Business logic layer
- **Modules** - Organize application
- **DTOs** - Data Transfer Objects
- **Exception Filters** - Error handling
- **Pipes** - Validation and transformation

### API Endpoints
- `GET /` - API information
- `GET /health` - Health check endpoint
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Example: Dependency Injection

```typescript
@Injectable()
export class UsersService {
  findAll(): User[] {
    return this.users;
  }
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

## 🧪 Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run start:dev
```

### Build for Production

```bash
npm run build
```

### Run Production Build

```bash
npm run start:prod
```

## 📦 Production Deployment

The optimized image is production-ready with:

- ✅ Node.js 20 (LTS)
- ✅ TypeScript compiled to JavaScript
- ✅ Alpine Linux base
- ✅ Non-root user execution
- ✅ Health check endpoint
- ✅ Production dependencies only
- ✅ Dependency injection
- ✅ Modular architecture
- ✅ CORS enabled

### Docker Compose Example

```yaml
version: '3.8'
services:
  nestjs-api:
    image: nestjs-demo:optimized
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/health')"]
      interval: 30s
      timeout: 3s
      retries: 3
    restart: unless-stopped
```

## 🎓 Learning Points

1. **Multi-stage builds** reduce image size by 70%
2. **TypeScript compilation** happens in build stage only
3. **Dependency injection** makes code testable and modular
4. **Module system** organizes large applications
5. **DTOs and decorators** provide structure and validation
6. **Production build** excludes all TypeScript overhead

## 📈 Performance Comparison

| Metric | Optimized | Basic |
|--------|-----------|-------|
| Image Size | ~180 MB | ~600 MB |
| Build Time | ~60s | ~80s |
| Layers | 8 | 10 |
| Security | ✅ Non-root | ❌ Root |
| TypeScript | ✅ Compiled | ❌ Runtime |
| Production Ready | ✅ Yes | ❌ No (dev mode) |

## 🌟 When to Use NestJS

**Choose NestJS if you need:**
- Enterprise-grade architecture
- Large-scale applications
- Microservices
- TypeScript-first development
- Dependency injection
- Modular, testable code
- Angular-like structure

**Choose Express if you need:**
- Lightweight, flexible framework
- Quick prototypes
- Minimal overhead

**Choose Fastify if you need:**
- Maximum performance
- Schema validation
- JSON-heavy APIs

## 🔗 Related Examples

- [Express Example](../express/) - Lightweight Node.js framework
- [Fastify Example](../fastify/) - High-performance alternative
- [Angular Example](../angular/) - Frontend with similar architecture

---

Built with ❤️ by [Firas Mosbahi](https://github.com/firasmosbahi)
