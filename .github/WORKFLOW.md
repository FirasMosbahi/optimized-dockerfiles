# GitHub Actions Workflow Documentation

## Overview

This repository uses a **single, generic workflow** (`docker-build.yml`) to automatically build and push Docker images for all frameworks when changes are detected.

## How It Works

### Automatic Builds (Push to Main)

When you push changes to the `main` branch, the workflow:

1. **Detects changed frameworks** using path filters
2. **Builds only the affected frameworks** (efficient - no unnecessary builds)
3. **Builds in parallel** if multiple frameworks changed
4. **Pushes both optimized and basic images** to Docker Hub
5. **Uses layer caching** for faster builds

### Path Detection

The workflow monitors these paths:
- `javascript/react/**`
- `javascript/nextjs/**`
- `javascript/angular/**`
- `javascript/vue/**`
- `javascript/svelte/**`
- `python/fastapi/**`
- `python/flask/**`
- `python/django/**`
- `python/streamlit/**`

**Example:** If you modify `python/flask/app.py`, only the Flask images will be built.

### Manual Builds (Workflow Dispatch)

You can manually trigger builds for any framework:

1. Go to **Actions** tab in GitHub
2. Select **"Build and Push Docker Images"** workflow
3. Click **"Run workflow"**
4. Enter the framework path (e.g., `python/flask` or `javascript/react`)
5. Click **"Run workflow"**

## Image Tags

For each framework, two image variants are built:

### Optimized Image
```
<username>/optimized-dockerfiles:<framework>-latest
<username>/optimized-dockerfiles:<framework>-<commit-sha>
```

### Basic Image (Non-optimized)
```
<username>/optimized-dockerfiles:<framework>-basic-latest
<username>/optimized-dockerfiles:<framework>-basic-<commit-sha>
```

### Examples

**React:**
- `optimized-dockerfiles:react-latest`
- `optimized-dockerfiles:react-basic-latest`
- `optimized-dockerfiles:react-abc1234`

**Django:**
- `optimized-dockerfiles:django-latest`
- `optimized-dockerfiles:django-basic-latest`
- `optimized-dockerfiles:django-abc1234`

## Workflow Features

### 1. Smart Change Detection
- Only builds frameworks that actually changed
- Ignores markdown file changes
- Uses efficient path filtering

### 2. Parallel Builds
- If you change multiple frameworks, they build in parallel
- Faster CI/CD pipeline
- Better resource utilization

### 3. Docker Layer Caching
- Reuses layers from previous builds
- Significantly faster rebuild times
- Reduces Docker Hub bandwidth

### 4. Build Summaries
- Each build generates a summary in GitHub Actions
- Shows which frameworks were built
- Lists all pushed image tags

### 5. Secrets Required

Configure these secrets in your GitHub repository:
- `DOCKERHUB_USERNAME` - Your Docker Hub username
- `DOCKERHUB_TOKEN` - Docker Hub access token ([create one](https://hub.docker.com/settings/security))

## Adding New Frameworks

To add support for a new framework:

1. Create the framework directory: `<language>/<framework>/`
2. Add `Dockerfile` and `Dockerfile.basic`
3. Update the workflow path filters in `docker-build.yml`:

```yaml
filters: |
  <language>-<framework>:
    - '<language>/<framework>/**'
```

**Example - Adding Express:**
```yaml
javascript-express:
  - 'javascript/express/**'
```

## Troubleshooting

### Build fails with "permission denied"
- Check that `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets are set
- Verify the Docker Hub token has write permissions

### Workflow doesn't trigger
- Check that your changes are in a monitored path
- Markdown-only changes won't trigger builds (by design)
- Ensure you're pushing to the `main` branch

### Wrong framework builds
- Verify your file changes are in the correct directory
- Check path filters in the workflow file

### Build is slow
- First builds are always slower (no cache)
- Subsequent builds use layer caching
- Multiple parallel builds may slow individual build times

## Workflow File Location

`.github/workflows/docker-build.yml`

## Workflow Status

View workflow runs at: `https://github.com/<username>/optimized-dockerfiles/actions`

## Benefits Over Individual Workflows

✅ **Single file to maintain** instead of 9+ separate workflows
✅ **Consistent configuration** across all frameworks
✅ **Easier to update** - change once, applies everywhere
✅ **Better performance** with smart filtering and caching
✅ **Parallel execution** when multiple frameworks change
✅ **Cleaner repository** structure

---

**Note:** This workflow requires the `dorny/paths-filter@v3` action to detect changed files.
