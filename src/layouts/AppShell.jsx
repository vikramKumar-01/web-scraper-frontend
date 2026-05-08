import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function AppShell() {
  return (
    <div className="min-h-screen bg-mist bg-hero-grid">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 pb-10 pt-5 sm:px-6 sm:pb-14 sm:pt-8 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AppShell;
