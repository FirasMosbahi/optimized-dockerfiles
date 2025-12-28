function Profile() {
  return (
    <section>
      <h2>Your Profile 👤</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> Jane Doe</p>
        <p><strong>Role:</strong> Frontend Developer in training</p>
        <p><strong>Goals:</strong></p>
        <ul>
          <li>Master React and TypeScript</li>
          <li>Build full-stack apps with Node.js</li>
          <li>Learn DevOps basics (Docker, CI/CD, Kubernetes)</li>
        </ul>
      </div>
    </section>
  );
}

export default Profile;
