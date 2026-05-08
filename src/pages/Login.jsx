import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import FormField from "../components/ui/FormField";
import Alert from "../components/ui/Alert";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || "/";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await login(form);
      navigate(redirectPath, { replace: true });
    } catch (requestError) {
      setError(requestError.message || "Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-shell">
      <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden lg:block">
          <PageHeader
            eyebrow="Welcome back"
            title="Sign in to keep your scrape workflow connected"
            description="Authenticate once to bookmark stories, revisit saved links, and keep your dashboard synced with the backend service."
          />
          <div className="card max-w-2xl border-white/80 bg-white/95 p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-gradient-to-br from-orange-50 to-white p-4">
                <p className="text-sm font-semibold text-ink">Live feed</p>
                <p className="mt-2 text-sm text-slate">
                  Fetch top Hacker News stories with clean loading and retry states.
                </p>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-teal-50 to-white p-4">
                <p className="text-sm font-semibold text-ink">Bookmarks</p>
                <p className="mt-2 text-sm text-slate">
                  Save high-value stories and revisit them from a protected route.
                </p>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-slate-100 to-white p-4">
                <p className="text-sm font-semibold text-ink">Reliable API</p>
                <p className="mt-2 text-sm text-slate">
                  Graceful handling for backend downtime and invalid responses.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-card">
          <PageHeader
            eyebrow="Login"
            title="Access your ScrapeDeck account"
            description={`API target: ${api.getBaseUrl()}`}
          />

          {error ? (
            <div className="mb-6">
              <Alert
                title="Login failed"
                message={error}
                action={
                  <button type="button" className="btn-secondary" onClick={() => setError("")}>
                    Dismiss
                  </button>
                }
              />
            </div>
          ) : null}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <FormField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
            />
            <FormField
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="text-xs font-semibold text-slate hover:text-ink"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              }
            />

            <button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate">
            Need an account?{" "}
            <Link to="/register" className="font-semibold text-ink hover:text-ember">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
