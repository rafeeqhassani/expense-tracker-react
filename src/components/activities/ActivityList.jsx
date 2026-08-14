function ActivityList({ activities = [] }) {
  return (
    <>
      {activities.length === 0 ? (
        <p className="empty-state">No recent activity yet</p>
      ) : (
        <div className="activity-list">
          {activities.map((activity) => (
            <div className="activity-item" key={activity.id}>
              <p className="activity-message">{activity.message}</p>

              <small className="activity-date">
                {new Date(activity.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </small>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default ActivityList;
