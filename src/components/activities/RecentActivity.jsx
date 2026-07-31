import { useNavigate } from "react-router-dom";

import ActivityList from "./ActivityList";

function RecentActivity({ activities, hasMore }) {
  const navigate = useNavigate();

  return (
    <section className="recent-activity">
      <h2>Recent Activity</h2>

      <ActivityList activities={activities} />

      {hasMore && (
        <button type="button" onClick={() => navigate("/dashboard/activities")}>
          View All Activities
        </button>
      )}
    </section>
  );
}

export default RecentActivity;
