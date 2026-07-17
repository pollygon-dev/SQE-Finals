import { useState } from "react";

export default function LoginCard({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await onLogin(username, password);
    setError(res.ok ? "" : res.error);
  }

  return (
    <section className="nb-card login-card">
      <h1>Student Records<br />Sign in</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="nb-input"
          placeholder="Username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="nb-input"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="nb-button blue" type="submit">Log in</button>
      </form>
      <p className="error">{error}</p>
      <p className="hint">Demo users: admin / admin123 · teacher / teach2026</p>
    </section>
  );
}
