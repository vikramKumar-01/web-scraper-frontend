import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import MobileMenu from "./MobileMenu";

const navLinkClass = ({ isActive }) =>
  `inline-flex min-h-11 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-ink text-white shadow-sm"
      : "text-slate hover:bg-white hover:text-ink hover:shadow-sm"
  }`;

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-mist/80 backdrop-blur-xl">
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="card rounded-[30px] border-white/80 bg-white/80 px-4 py-4 sm:px-5 lg:px-6">
          <div className="flex items-start justify-between gap-4 lg:grid lg:grid-cols-[minmax(0,1.15fr)_auto] lg:items-center lg:gap-8">
            <div className="min-w-0 lg:max-w-2xl">
              <NavLink to="/" className="inline-flex text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                ScrapeDeck
              </NavLink>
              <p className="mt-1 max-w-xl text-sm leading-6 text-slate lg:max-w-2xl">
                A cleaner way to track the strongest Hacker News stories and save the ones worth revisiting.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sand text-ink transition hover:bg-white lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-5 rounded-full bg-current transition ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""}`}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full bg-current transition ${isMobileMenuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full bg-current transition ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
                />
              </span>
            </button>

            <div className="hidden lg:flex lg:items-center lg:gap-3 xl:gap-4">
              <nav className="flex items-center gap-2">
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>
                {isAuthenticated ? (
                  <NavLink to="/bookmarks" className={navLinkClass}>
                    Bookmarks
                  </NavLink>
                ) : null}
                {isAuthenticated ? (
                  <NavLink to="/profile" className={navLinkClass}>
                    Profile
                  </NavLink>
                ) : null}
              </nav>

              <div className="h-8 w-px bg-slate-200" />

              <div className="flex items-center gap-2">
                {isAuthenticated ? (
                  <>
                    <span className="inline-flex min-h-11 max-w-[220px] items-center justify-center rounded-full bg-sand px-4 py-2 text-sm font-medium text-slate shadow-sm">
                      <span className="truncate">
                        {user?.name || user?.email || "Signed in"}
                      </span>
                    </span>
                    <button type="button" onClick={handleLogout} className="btn-accent">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className={navLinkClass}>
                      Login
                    </NavLink>
                    <NavLink to="/register" className="btn-primary">
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            className={`grid transition-all duration-300 lg:hidden ${
              isMobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <MobileMenu
                isAuthenticated={isAuthenticated}
                userLabel={user?.name || user?.email || "Signed in"}
                onLogout={handleLogout}
                onNavigate={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
