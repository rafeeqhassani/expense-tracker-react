import { useNavigate } from "react-router-dom";

import ActivityList from "./ActivityList";

import LoadingState from "../ui/LoadingState";
import ErrorState from "../ui/ErrorState";

function RecentActivity({
  activities,
  hasMore,
  loading,
  error,
  loadActivityPreview,
}) {
  const navigate = useNavigate();

  if (loading) {
    return <LoadingState message="Loading activities..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadActivityPreview} />;
  }

  return (
    <section className="recent-activity">
      <h2>Recent Activity</h2>

      <ActivityList activities={activities} />

      {hasMore && (
        <button
          type="button"
          className="activity-action"
          onClick={() => navigate("/dashboard/activities")}
        >
          View All Activities
        </button>
      )}
    </section>
  );
}

export default RecentActivity;
