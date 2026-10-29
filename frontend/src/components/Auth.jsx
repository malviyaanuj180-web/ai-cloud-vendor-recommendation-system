
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Auth.css";
import { Eye, EyeOff } from "lucide-react";
export default function Auth({ onLogin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignup = location.pathname === "/signup";
const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // Frontend demonstration only; real authentication comes later.
    const user = {
      name: isSignup ? name.trim() : email.split("@")[0],
      email: email.trim(),
    };

    if (!user.name || !user.email || password.length < 6) {
      alert("Please enter valid details. Password must have at least 6 characters.");
      return;
    }

    onLogin(user);
    navigate("/");
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-brand">
          <span className="auth-cloud">☁</span>
          CloudWise<span></span>
        </Link>

        <h1>{isSignup ? "Create your account" : "Welcome back"}</h1>
        <p className="auth-subtitle">
          {isSignup
            ? "Start making smarter cloud decisions."
            : "Log in to continue to CloudWise."}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup && (
            <label>
              Full name
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </label>
          )}

          <label>
            Email address
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password
            <div className="password-field">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
<button
  type="button"
  className="password-toggle"
  onClick={() => setShowPassword((prev) => !prev)}
  aria-label={showPassword ? "Hide password" : "Show password"}
>
  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
</button>
</div>
            
<div className="forgot-password-row">
  {!isSignup && (
  <button
    type="button"
    className="forgot-password-link"
    onClick={() => {
      const email = prompt("Enter your registered email address:");

      if (email && email.trim()) {
        alert(
          "Password reset is not connected yet. Please connect a password reset API to continue."
        );
      }
    }}
  >
    Forgot password?
  </button>
)}
</div>

          </label>

          <button className="auth-primary" type="submit">
            {isSignup ? "Create account" : "Log in"} →
          </button>
        </form>

       
{!isSignup && (
  <>
    <div className="auth-divider">
      <span>or continue with</span>
    </div>

    <div className="auth-socials">
      <button
        type="button"
        onClick={() => alert("Google authentication will be connected later.")}
        className="google-mark"
        
      >
        
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 48 48"
  width="20"
  height="20"
  aria-hidden="true"
>
  <path
    fill="#4285F4"
    d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
  />
  <path
    fill="#34A853"
    d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
  />
  <path
    fill="#FBBC05"
    d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
  />
  <path
    fill="#EA4335"
    d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.9 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12Z"
  />
</svg>
<span>Google</span>
      </button>

     
<button
  type="button"
  onClick={() =>
    alert("GitHub authentication will be connected later.")
  }
  className="github-login-button"
>
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="20"
  height="20"
  fill="currentColor"
  aria-hidden="true"
>
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M12 .297a12 12 0 0 0-3.793 23.385c.6.111.82-.26.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.467-1.334-5.467-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 6.006 0c2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.608-2.807 5.623-5.48 5.921.43.372.814 1.102.814 2.222v3.293c0 .32.216.694.825.576A12 12 0 0 0 12 .297Z"
  />
</svg>

  <span>GitHub</span>
</button>

    </div>
  </>
)}


        <p className="auth-switch">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link to={isSignup ? "/login" : "/signup"}>
            {isSignup ? "Log in" : "Sign up"}
          </Link>
        </p>

        <Link to="/" className="auth-back">← Back to home</Link>
      </section>
    </main>
  );
}
