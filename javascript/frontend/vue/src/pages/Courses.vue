<template>
  <section>
    <h2>Your Courses 📚</h2>

    <ul class="course-list">
      <li v-for="course in courses" :key="course.id" class="course-card">
        <h3>{{ course.title }}</h3>
        <p>Level: {{ course.level }}</p>

        <div class="progress-bar">
          <div class="fill" :style="{ width: course.progress + '%' }"></div>
        </div>

        <small>{{ course.progress }}% complete</small>
      </li>
    </ul>
  </section>
</template>

<script setup>
const courses = [
  { id: 1, title: "Vue Basics", level: "Beginner", progress: 60 },
  { id: 2, title: "Node.js Fundamentals", level: "Intermediate", progress: 40 },
  { id: 3, title: "DevOps Essentials", level: "Intermediate", progress: 25 }
]
</script>

<style scoped>
.course-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.course-card {
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.progress-bar {
  height: 8px;
  background: #ccc;
  border-radius: 6px;
}

.fill {
  height: 100%;
  background: #42b883;
}
</style>
