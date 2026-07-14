import { useParams } from "react-router-dom";

import useEpics from "../../hooks/useEpics";

function EpicPage() {
  const { slug, project_slug } = useParams();

  const { epics, count, loading, error } = useEpics(slug, project_slug);
 

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="m-18">
      <h1>Total Epics: {count}</h1>

      {epics.map((epic) => (
        <h1 key={epic.id}>
          {epic.name} - {epic.description}
        </h1>
      ))}
    </div>
  );
}

export default EpicPage;
