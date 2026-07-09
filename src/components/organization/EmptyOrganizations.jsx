function EmptyOrganizations() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <h2 className="text-2xl font-semibold">No organizations found</h2>

      <p className="text-gray-400 mt-3">
        Create an organization or accept an invitation to get started.
      </p>
    </div>
  );
}

export default EmptyOrganizations;
