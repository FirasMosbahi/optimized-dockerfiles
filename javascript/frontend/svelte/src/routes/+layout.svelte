<script lang="ts">
  import { page } from '$app/stores';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: '/profile', label: 'Profile' }
  ];
</script>

<svelte:head>
  <title>Learning Tracker • SvelteKit</title>
</svelte:head>

<div class="app">
  <header class="header">
    <h1>Learning Tracker</h1>

    <nav class="nav">
      {#each links as link}
        <a
          href={link.href}
          class:active={$page.url.pathname === link.href}
        >
          {link.label}
        </a>
      {/each}
    </nav>
  </header>

  <main class="main">
    <slot />
  </main>

  <footer class="footer">
    <small>© {new Date().getFullYear()} Learning Tracker (SvelteKit)</small>
  </footer>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #f5f7fa;
    color: #111827;
  }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .header {
    background: #020617;
    color: #f9fafb;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav {
    display: flex;
    gap: 1rem;
  }

  .nav a {
    color: #9ca3af;
    text-decoration: none;
    font-weight: 500;
    padding-bottom: 0.25rem;
    border-bottom: 2px solid transparent;
  }

  .nav a.active {
    color: #f97316;
    border-color: #f97316;
  }

  .main {
    flex: 1;
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 2rem 1.5rem 3rem;
  }

  .footer {
    background: #e5e7eb;
    text-align: center;
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
    color: #4b5563;
  }
</style>
