import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import FormField from "../components/ui/FormField";
import Alert from "../components/ui/Alert";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await register(form);
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(requestError.message || "Unable to create account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-shell">
      <div className="auth-card">
        <PageHeader
          eyebrow="Create account"
          title="Start curating your own story shortlist"
          description="Register once to unlock bookmarks, protect your saved research, and keep the dashboard personalized."
        />

        {error ? (
          <div className="mb-6">
            <Alert title="Registration failed" message={error} />
          </div>
        ) : null}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <FormField
            id="name"
            name="name"
            label="Name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            autoComplete="name"
          />
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
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a secure password"
            autoComplete="new-password"
          />

          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-ink hover:text-ember">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
