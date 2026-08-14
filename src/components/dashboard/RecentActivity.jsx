import { useNavigate } from "react-router-dom";

import ActivityList from "../activities/ActivityList";

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
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <section className="recent-activity">
      <h2 className="section-title">Recent Activity</h2>

      <ActivityList activities={activities} />

      {hasMore && (
        <button
          type="button"
          className="btn btn-primary activity-action"
          onClick={() => navigate("/dashboard/activities")}
        >
          View All Activities
        </button>
      )}
    </section>
  );
}

export default RecentActivity;
