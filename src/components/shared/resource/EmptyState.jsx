function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <h2 className="text-2xl font-semibold">{title}</h2>

      <p className="text-gray-400 mt-3">{description}</p>
    </div>
  );
}

export default EmptyState;
