import useAppContext from "../providers/useAppContext";
import ActivityList from "../components/activities/ActivityList";

import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

function ActivitiesPage() {
  const { activity, actions } = useAppContext();

  const { activities, loading, error, loadingMore, pagination } = activity;

  if (loading) {
    return <LoadingState message="Loading activities..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={actions.loadActivities} />;
  }

  return (
    <section className="activity-page">
      <h2>All Activities</h2>

      <ActivityList activities={activities} />

      {pagination?.hasMore && (
        <button
          type="button"
          className="activity-action"
          onClick={actions.loadMoreActivities}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      )}
    </section>
  );
}

export default ActivitiesPage;
