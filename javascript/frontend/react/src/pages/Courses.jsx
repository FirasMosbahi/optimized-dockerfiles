const mockCourses = [
  { id: 1, title: "React Basics", level: "Beginner", progress: 70 },
  { id: 2, title: "Node.js Fundamentals", level: "Intermediate", progress: 40 },
  { id: 3, title: "DevOps Essentials", level: "Intermediate", progress: 20 },
];

function Courses() {
  return (
    <section>
      <h2>Your Courses 📚</h2>
      <p>Here are some example courses you’re “enrolled” in:</p>
      <ul className="course-list">
        {mockCourses.map((course) => (
          <li key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p>Level: {course.level}</p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <small>{course.progress}% complete</small>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Courses;
