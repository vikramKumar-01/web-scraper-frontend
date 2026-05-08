function EmptyState({ title, message, action }) {
  return (
    <div className="card p-8 text-center">
      <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-sand" />
      <h3 className="text-xl font-bold text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate">{message}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export default EmptyState;
