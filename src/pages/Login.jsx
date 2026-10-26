
import { useState } from "react";
import { BrainCircuit, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    // Demo navigation only — not real authentication.
    onLogin();
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand-icon">
          <BrainCircuit size={32} />
        </div>

        <p className="eyebrow">SMART CLASSROOM INTELLIGENCE</p>
        <h1>Welcome to DRISHTI</h1>
        <p className="muted">
          Sign in to access classroom monitoring and energy analytics.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Email address</label>
          <div className="login-input-wrapper">
            <Mail size={18} />
            <input
              id="email"
              type="email"
              placeholder="you@college.edu"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="login-input-wrapper">
            <Lock size={18} />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" className="login-submit">
            Sign In
          </button>
        </form>

        {message && <p className="login-message">{message}</p>}

        <p className="login-demo-note">
          Demo mode · Credentials are not verified
        </p>
      </section>
    </main>
  );
}
