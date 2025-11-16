export default function Profile() {
  return (
    <section>
      <h1>Your Profile 👤</h1>
      <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: 8 }}>
        <p><strong>Name:</strong> Jane Doe</p>
        <p><strong>Role:</strong> Next.js Developer in training</p>
        <p><strong>Goals:</strong></p>
        <ul>
          <li>Master Next.js</li>
          <li>Improve backend knowledge</li>
          <li>Build production-quality apps</li>
        </ul>
      </div>
    </section>
  );
}
