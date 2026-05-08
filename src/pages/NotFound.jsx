import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="card max-w-xl p-10 text-center">
        <span className="rounded-full bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-ember">
          404 Error
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink">
          This page fell out of the scrape queue.
        </h1>
        <p className="mt-4 text-sm text-slate sm:text-base">
          The page you requested does not exist or has moved. Head back to the live stories feed.
        </p>
        <Link to="/" className="btn-primary mt-8" onClick={(e) => { if (e.ctrlKey || e.metaKey || e.button === 1) e.preventDefault(); }}>
          Return home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
