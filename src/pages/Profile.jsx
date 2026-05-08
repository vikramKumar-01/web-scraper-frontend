import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <section className="mx-auto max-w-2xl">
      <PageHeader
        eyebrow="Account"
        title="Your Profile"
        description="Manage your account details and preferences"
      />

      <div className="card p-6 sm:p-8">
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-6">
            <label className="mb-2 block text-sm font-semibold text-slate">
              Full Name
            </label>
            <p className="text-base font-medium text-ink sm:text-lg">
              {user?.name || "Not provided"}
            </p>
          </div>

          <div className="border-b border-slate-200 pb-6">
            <label className="mb-2 block text-sm font-semibold text-slate">
              Email Address
            </label>
            <p className="break-all text-base font-medium text-ink sm:text-lg">
              {user?.email || "Not provided"}
            </p>
          </div>

          <div className="border-b border-slate-200 pb-6">
            <label className="mb-2 block text-sm font-semibold text-slate">
              Account Status
            </label>
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
              <p className="text-base font-medium text-ink sm:text-lg">Active</p>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate">
              Member Since
            </label>
            <p className="text-base font-medium text-ink sm:text-lg">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleLogout}
            className="btn-accent w-full"
          >
            Logout
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn-secondary w-full"
          >
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
}

export default Profile;
