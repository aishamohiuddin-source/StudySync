import "./dashboard.css";

function Dashboard() {
  // Demo study sessions
  // Later we will connect this with Planner + localStorage
  const sessions = [
    {
      id: 1,
      subject: "React",
      topic: "React Components",
      duration: 60,
      status: "completed",
    },
    {
      id: 2,
      subject: "Database",
      topic: "SQL Queries",
      duration: 45,
      status: "active",
    },
    {
      id: 3,
      subject: "JavaScript",
      topic: "Async JavaScript",
      duration: 30,
      status: "pending",
    },
    {
      id: 4,
      subject: "Software Engineering",
      topic: "SDLC",
      duration: 40,
      status: "completed",
    },
  ];

  // Statistics
  const totalSessions = sessions.length;

  const completedSessions = sessions.filter(
    (session) => session.status === "completed"
  ).length;

  const activeSessions = sessions.filter(
    (session) => session.status === "active"
  ).length;

  const pendingSessions = sessions.filter(
    (session) => session.status === "pending"
  ).length;

  const totalMinutes = sessions.reduce(
    (total, session) => total + Number(session.duration),
    0
  );

  const completionRate =
    totalSessions === 0
      ? 0
      : Math.round((completedSessions / totalSessions) * 100);

  const productivityScore = Math.min(
    100,
    Math.round(completionRate + activeSessions * 10)
  );

  return (
    <div className="dashboard">

      {/* ================= HEADER ================= */}

      <div className="dashboard-header">

        <div>
          <span className="dashboard-tag">
            📊 Productivity Overview
          </span>

          <h1>Study Dashboard</h1>

          <p>
            Track your study progress, sessions and productivity
            from one place.
          </p>
        </div>

        <div className="today-box">
          <span>Today</span>
          <strong>StudyFlow</strong>
        </div>

      </div>


      {/* ================= STAT CARDS ================= */}

      <div className="dashboard-stats">

        <div className="dashboard-stat-card">
          <div className="stat-icon green">
            📚
          </div>

          <div>
            <span>Total Sessions</span>
            <h2>{totalSessions}</h2>
            <small>All study sessions</small>
          </div>
        </div>


        <div className="dashboard-stat-card">
          <div className="stat-icon success">
            ✓
          </div>

          <div>
            <span>Completed</span>
            <h2>{completedSessions}</h2>
            <small>Sessions completed</small>
          </div>
        </div>


        <div className="dashboard-stat-card">
          <div className="stat-icon warning">
            ⏳
          </div>

          <div>
            <span>Active</span>
            <h2>{activeSessions}</h2>
            <small>Currently active</small>
          </div>
        </div>


        <div className="dashboard-stat-card">
          <div className="stat-icon grey">
            ⏱
          </div>

          <div>
            <span>Study Time</span>
            <h2>{totalMinutes}</h2>
            <small>Total minutes</small>
          </div>
        </div>

      </div>


      {/* ================= MAIN GRID ================= */}

      <div className="dashboard-main-grid">


        {/* LEFT COLUMN */}

        <div className="dashboard-left">


          {/* Progress Card */}

          <div className="dashboard-card progress-card">

            <div className="card-heading">

              <div>
                <span className="section-label">
                  YOUR PROGRESS
                </span>

                <h2>Study Progress</h2>

                <p>
                  Keep completing your sessions to improve
                  your productivity.
                </p>
              </div>

              <span className="progress-badge">
                {completionRate}% Complete
              </span>

            </div>


            <div className="progress-content">

              <div
                className="progress-ring"
                style={{
                  "--progress": `${completionRate * 3.6}deg`,
                }}
              >
                <div className="progress-inner">
                  <strong>{completionRate}%</strong>
                  <span>Completed</span>
                </div>
              </div>


              <div className="progress-info">

                <div className="progress-item">
                  <span className="dot completed-dot"></span>

                  <div>
                    <strong>{completedSessions}</strong>
                    <p>Completed sessions</p>
                  </div>
                </div>


                <div className="progress-item">
                  <span className="dot active-dot"></span>

                  <div>
                    <strong>{activeSessions}</strong>
                    <p>Active sessions</p>
                  </div>
                </div>


                <div className="progress-item">
                  <span className="dot pending-dot"></span>

                  <div>
                    <strong>{pendingSessions}</strong>
                    <p>Pending sessions</p>
                  </div>
                </div>

              </div>

            </div>

          </div>


          {/* Study Sessions */}

          <div className="dashboard-card">

            <div className="card-heading">

              <div>
                <span className="section-label">
                  RECENT ACTIVITY
                </span>

                <h2>Study Sessions</h2>
              </div>

              <button className="view-btn">
                View All
              </button>

            </div>


            <div className="session-list">

              {sessions.map((session) => (

                <div className="dashboard-session" key={session.id}>

                  <div className="session-icon">
                    📖
                  </div>


                  <div className="session-details">

                    <h3>{session.subject}</h3>

                    <p>{session.topic}</p>

                  </div>


                  <div className="session-duration">
                    <strong>
                      {session.duration}
                    </strong>

                    <span>min</span>
                  </div>


                  <span
                    className={`status-badge ${session.status}`}
                  >
                    {session.status}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* RIGHT COLUMN */}

        <div className="dashboard-right">


          {/* Productivity Score */}

          <div className="dashboard-card productivity-card">

            <span className="section-label">
              PRODUCTIVITY
            </span>

            <h2>Productivity Score</h2>

            <div className="productivity-score">

              <strong>{productivityScore}</strong>

              <span>/ 100</span>

            </div>

            <div className="score-bar">

              <div
                style={{
                  width: `${productivityScore}%`,
                }}
              ></div>

            </div>

            <p>
              {productivityScore >= 70
                ? "Great work! Keep maintaining your study routine. 🚀"
                : "Keep going! Complete more sessions to improve your score."}
            </p>

          </div>


          {/* Study Summary */}

          <div className="dashboard-card">

            <div className="card-heading">

              <div>
                <span className="section-label">
                  OVERVIEW
                </span>

                <h2>Study Summary</h2>
              </div>

            </div>


            <div className="summary-list">

              <div className="summary-row">
                <span>📚 Total sessions</span>
                <strong>{totalSessions}</strong>
              </div>

              <div className="summary-row">
                <span>✓ Completed</span>
                <strong>{completedSessions}</strong>
              </div>

              <div className="summary-row">
                <span>⏳ Pending</span>
                <strong>{pendingSessions}</strong>
              </div>

              <div className="summary-row">
                <span>⏱ Study minutes</span>
                <strong>{totalMinutes}</strong>
              </div>

              <div className="summary-row">
                <span>🎯 Completion rate</span>
                <strong>{completionRate}%</strong>
              </div>

            </div>

          </div>


          {/* Quick Actions */}

          <div className="dashboard-card quick-card">

            <span className="section-label">
              QUICK ACTIONS
            </span>

            <h2>Keep Studying</h2>

            <p>
              Ready for your next focused study session?
            </p>

            <button
              className="primary-action"
              onClick={() => {
                window.location.href = "/planner";
              }}
            >
              + Create Study Session
            </button>

          </div>


        </div>

      </div>


      {/* ================= BOTTOM ================= */}

      <div className="dashboard-footer-card">

        <div>
          <span>🌱 StudyFlow Insight</span>

          <h2>
            Consistency is the key to better productivity.
          </h2>

          <p>
            Plan your sessions, complete your goals and
            keep improving your study routine every day.
          </p>
        </div>

        <div className="footer-icon">
          📈
        </div>

      </div>

    </div>
  );
}

export default Dashboard;