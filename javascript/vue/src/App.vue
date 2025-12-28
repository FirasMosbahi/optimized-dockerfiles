<template>
  <div class="app">
    <header class="header">
      <h1>Learning Tracker</h1>

      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/courses">Courses</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
      </nav>
    </header>

    <main class="main">
      <RouterView />
    </main>

    <footer class="footer">© {{ year }} Learning Tracker</footer>
  </div>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.header {
  background: #222;
  color: #fff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav a {
  margin-left: 1rem;
  text-decoration: none;
  color: #aaa;
}
.nav a.router-link-active {
  color: #42b883;
  border-bottom: 2px solid #42b883;
}
.main {
  padding: 2rem;
  max-width: 900px;
  margin: auto;
}
.footer {
  text-align: center;
  padding: 1rem;
  background: #eee;
}
</style>
