function StorySkeletonGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="card animate-pulse p-6">
          <div className="mb-5 flex justify-between">
            <div className="h-6 w-24 rounded-full bg-sand" />
            <div className="h-4 w-20 rounded-full bg-sand" />
          </div>
          <div className="h-7 rounded-xl bg-sand" />
          <div className="mt-3 h-4 w-28 rounded-full bg-sand" />
          <div className="mt-6 flex gap-3">
            <div className="h-10 w-28 rounded-full bg-sand" />
            <div className="h-10 w-36 rounded-full bg-sand" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default StorySkeletonGrid;
