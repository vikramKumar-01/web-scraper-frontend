function Pagination({ page, totalPages, onPageChange }) {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <div className="mt-8 flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/80 px-4 py-4 shadow-panel sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <p className="text-center text-sm text-slate sm:text-left">
        Page <span className="font-bold text-ink">{page}</span> of{" "}
        <span className="font-bold text-ink">{totalPages}</span>
      </p>

      <div className="flex w-full items-center gap-3 sm:w-auto">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={prevDisabled}
          className="btn-secondary flex-1 sm:flex-none"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={nextDisabled}
          className="btn-primary flex-1 sm:flex-none"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
