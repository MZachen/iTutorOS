export default function HomePage() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ margin: 0 }}>iTutorOS</h1>
      <p style={{ marginTop: 8 }}>
        Next.js app is set up. API endpoints will be available at routes like{" "}
        <code>/organizations</code>, <code>/leads</code>, and{" "}
        <code>/schedule-entries</code>.
      </p>
      <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
        <a href="/signup">Sign up</a>
        <a href="/login">Log in</a>
        <a href="/dashboard">Dashboard</a>
      </div>
    </main>
  );
}
