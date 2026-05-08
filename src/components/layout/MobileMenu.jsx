import { NavLink } from "react-router-dom";

const mobileLinkClass = ({ isActive }) =>
  `flex min-h-12 items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition ${
    isActive
      ? "bg-ink text-white shadow-sm"
      : "bg-sand text-ink hover:bg-white"
  }`;

function MobileMenu({ isAuthenticated, userLabel, onLogout, onNavigate }) {
  return (
    <div className="lg:hidden">
      <div className="card mt-3 border border-white/80 bg-white/95 p-3 shadow-panel">
        <div className="grid gap-2">
          <NavLink to="/" className={mobileLinkClass} onClick={onNavigate}>
            Home
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/bookmarks" className={mobileLinkClass} onClick={onNavigate}>
                Bookmarks
              </NavLink>
              <NavLink to="/profile" className={mobileLinkClass} onClick={onNavigate}>
                Profile
              </NavLink>
              <div className="rounded-2xl bg-sand px-4 py-3 text-center text-sm font-medium text-slate">
                {userLabel}
              </div>
              <button type="button" onClick={onLogout} className="btn-accent w-full">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={mobileLinkClass} onClick={onNavigate}>
                Login
              </NavLink>
              <NavLink to="/register" className="btn-primary w-full" onClick={onNavigate}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
