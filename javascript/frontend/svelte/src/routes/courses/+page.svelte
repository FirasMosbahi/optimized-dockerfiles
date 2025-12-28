<script lang="ts">
  const courses = [
    { id: 1, title: 'Svelte Basics', level: 'Beginner', progress: 80 },
    { id: 2, title: 'TypeScript Essentials', level: 'Intermediate', progress: 45 },
    { id: 3, title: 'DevOps Fundamentals', level: 'Intermediate', progress: 20 }
  ];
</script>

<section>
  <h2>Your Courses 📚</h2>
  <p>Here are some example courses you’re “enrolled” in:</p>

  <ul class="course-list">
    {#each courses as course}
      <li class="course-card">
        <h3>{course.title}</h3>
        <p>Level: {course.level}</p>
        <div class="progress-bar">
          <div
            class="progress-fill"
            style={`width: ${course.progress}%`}
          />
        </div>
        <small>{course.progress}% complete</small>
      </li>
    {/each}
  </ul>
</section>

<style>
  h2 {
    margin-bottom: 0.5rem;
  }

  .course-list {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
    display: grid;
    gap: 1rem;
  }

  .course-card {
    background: #ffffff;
    padding: 1rem 1.25rem;
    border-radius: 0.75rem;
    box-shadow: 0 1px 4px rgba(15, 23, 42, 0.1);
  }

  .progress-bar {
    margin: 0.5rem 0;
    height: 8px;
    background: #e5e7eb;
    border-radius: 999px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #22c55e;
  }
</style>
