import useAppContext from "../providers/useAppContext";
import ActivityList from "../components/activities/ActivityList";

import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

function ActivitiesPage() {
  const { activity } = useAppContext();

  const {
    activities,
    loading,
    error,
    loadingMore,
    pagination,
    loadMoreActivities,
  } = activity;

  if (loading) {
    return <LoadingState message="Loading activities..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadMoreActivities} />;
  }

  return (
    <section className="activity-page">
      <h2>All Activities</h2>

      <ActivityList activities={activities} />

      {pagination?.hasMore && (
        <button
          type="button"
          onClick={loadMoreActivities}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      )}
    </section>
  );
}

export default ActivitiesPage;
