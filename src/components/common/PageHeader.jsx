function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-6 sm:mb-8">
      {eyebrow ? (
        <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-pine">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default PageHeader;
