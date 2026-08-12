import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    login({
      name: email.split("@")[0],
      email,
      isDemo: false,
    });

    navigate("/");
  };

  const handleDemoLogin = () => {
    login({
      name: "Demo Student",
      email: "demo@studysync.app",
      isDemo: true,
    });

    navigate("/");
  };

  return (
    <main className="login-page">
      <section className="login-card">
        {/* Brand */}
        <div className="login-brand">
          <div className="login-logo">📚</div>

          <div>
            <h1>
              Study<span>Sync</span>
            </h1>
            <p>Your personal study productivity workspace</p>
          </div>
        </div>

        {/* Heading */}
        <div className="login-heading">
          <h2>Welcome back</h2>
          <p>Sign in to continue your study journey.</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="login-form">

          <div className="form-group">
            <label htmlFor="email">Email address</label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <div className="password-label">
              <label htmlFor="password">Password</label>
              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  alert("Password recovery will be available soon.")
                }
              >
                Forgot password?
              </button>
            </div>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="login-divider">
          <span>OR</span>
        </div>

        {/* Demo */}
        <button
          type="button"
          className="demo-button"
          onClick={handleDemoLogin}
        >
          Continue as Demo Student
        </button>

        <p className="demo-info">
          Try StudySync without creating an account.
        </p>

        {/* Footer */}
        <p className="login-footer">
          By continuing, you agree to use StudySync responsibly for your
          study and productivity needs.
        </p>
      </section>
    </main>
  );
}

export default Login;