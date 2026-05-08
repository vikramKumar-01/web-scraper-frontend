function Alert({ title, message, action, tone = "error" }) {
  const toneClasses =
    tone === "error"
      ? "border-red-100 bg-red-50/80"
      : tone === "warning"
        ? "border-orange-100 bg-orange-50/80"
        : "border-emerald-100 bg-emerald-50/80";

  return (
    <div className={`card border ${toneClasses} p-5 sm:p-6`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-ink">{title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate">{message}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}

export default Alert;
