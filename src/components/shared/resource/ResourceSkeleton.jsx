function ResourceSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-3 p-6">
      {[1, 2, 3].map((item) => (
        <div key={item} className="h-40 rounded-xl bg-gray-800 animate-pulse" />
      ))}
    </div>
  );
}

export default ResourceSkeleton;
