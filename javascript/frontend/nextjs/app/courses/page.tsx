const mockCourses = [
  { id: 1, title: "Next.js Fundamentals", level: "Beginner", progress: 80 },
  { id: 2, title: "React Advanced Patterns", level: "Intermediate", progress: 50 },
  { id: 3, title: "DevOps for Developers", level: "Intermediate", progress: 20 },
];

export default function Courses() {
  return (
    <section>
      <h1>Courses 📚</h1>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {mockCourses.map((course) => (
          <li key={course.id} style={{ margin: "1rem 0", padding: "1rem", border: "1px solid #ddd", borderRadius: 8 }}>
            <h2>{course.title}</h2>
            <p>Level: {course.level}</p>
            <div style={{ background: "#eee", height: 6, borderRadius: 5, overflow: "hidden" }}>
              <div style={{ width: `${course.progress}%`, height: "100%", background: "green" }} />
            </div>
            <small>{course.progress}% complete</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
