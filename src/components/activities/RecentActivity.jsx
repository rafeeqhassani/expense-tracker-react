function RecentActivity({ activities }) {
  return (
    <section>
      <h2>Recent Activity</h2>

      {activities.map((activity) => (
        <div key={activity.id}>
          <p>{activity.message}</p>
          <small>
            {" "}
            {new Date(activity.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </small>
        </div>
      ))}
    </section>
  );
}

export default RecentActivity;
