function RecentActivity({ activities }) {
  return (
    <section className="recent-activity">
      <h2>Recent Activity</h2>

      {activities.length === 0 ? (
        <p className="empty-activity-message">No recent activity yet</p>
      ) : (
        <div className="activity-list">
          {activities.map((activity) => (
            <div className="activity-item" key={activity.id}>
              <p className="activity-message">{activity.message}</p>
              <small className="activity-date">
                {new Date(activity.created_at).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </small>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentActivity;
