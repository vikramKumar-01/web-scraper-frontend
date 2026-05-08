function Loader({ label = "Loading...", fullScreen = false }) {
  const wrapperClass = fullScreen
    ? "flex min-h-[50vh] items-center justify-center"
    : "flex items-center justify-center py-10";

  return (
    <div className={wrapperClass}>
      <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-panel">
        <span className="h-3 w-3 animate-pulse rounded-full bg-ember" />
        <p className="text-sm font-medium text-slate">{label}</p>
      </div>
    </div>
  );
}

export default Loader;
