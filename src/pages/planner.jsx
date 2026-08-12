import { useEffect, useState } from "react";
import "./planner.css";

function Planner() {
  // =========================
  // FORM STATES
  // =========================
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");

  // =========================
  // LOAD SESSIONS
  // =========================
  const [sessions, setSessions] = useState(() => {
    const savedSessions = localStorage.getItem("studySessions");

    return savedSessions
      ? JSON.parse(savedSessions)
      : [
          {
            id: Date.now(),
            subject: "Chemistry",
            topic: "Organic Chemistry",
            duration: 25,
            remaining: 25 * 60,
            status: "active",
            isRunning: false,
          },
        ];
  });

  // =========================
  // SAVE TO LOCAL STORAGE
  // =========================
  useEffect(() => {
    localStorage.setItem("studySessions", JSON.stringify(sessions));
  }, [sessions]);

  // =========================
  // TIMER
  // =========================
  useEffect(() => {
    const timer = setInterval(() => {
      setSessions((currentSessions) =>
        currentSessions.map((session) => {
          if (!session.isRunning || session.status === "completed") {
            return session;
          }

          if (session.remaining <= 1) {
            return {
              ...session,
              remaining: 0,
              isRunning: false,
              status: "completed",
            };
          }

          return {
            ...session,
            remaining: session.remaining - 1,
          };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // =========================
  // ADD SESSION
  // =========================
  const addSession = () => {
    if (
      subject.trim() === "" ||
      topic.trim() === "" ||
      duration === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const durationNumber = Number(duration);

    if (durationNumber <= 0) {
      alert("Duration must be greater than 0");
      return;
    }

    const newSession = {
      id: Date.now(),
      subject: subject.trim(),
      topic: topic.trim(),
      duration: durationNumber,
      remaining: durationNumber * 60,
      status: "active",
      isRunning: false,
    };

    setSessions((prev) => [...prev, newSession]);

    setSubject("");
    setTopic("");
    setDuration("");
  };

  // =========================
  // START / PAUSE TIMER
  // =========================
  const toggleTimer = (id) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id
          ? {
              ...session,
              isRunning:
                session.status === "completed"
                  ? false
                  : !session.isRunning,
            }
          : session
      )
    );
  };

  // =========================
  // RESET TIMER
  // =========================
  const resetTimer = (id) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id
          ? {
              ...session,
              remaining: session.duration * 60,
              isRunning: false,
              status: "active",
            }
          : session
      )
    );
  };

  // =========================
  // COMPLETE SESSION
  // =========================
  const completeSession = (id) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id
          ? {
              ...session,
              status: "completed",
              isRunning: false,
              remaining: 0,
            }
          : session
      )
    );
  };

  // =========================
  // DELETE SESSION
  // =========================
  const deleteSession = (id) => {
    setSessions((prev) =>
      prev.filter((session) => session.id !== id)
    );
  };

  // =========================
  // FORMAT TIMER
  // =========================
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  };

  // =========================
  // STATS
  // =========================
  const totalSessions = sessions.length;

  const completedSessions = sessions.filter(
    (session) => session.status === "completed"
  ).length;

  const activeSessions = sessions.filter(
    (session) => session.status === "active"
  ).length;

  const progress =
    totalSessions === 0
      ? 0
      : Math.round((completedSessions / totalSessions) * 100);

  // =========================
  // UI
  // =========================
  return (
    <div className="planner-page">

      {/* HEADER */}
      <div className="planner-header">
        <div>
          <span className="planner-tag">
            📚 Smart Study Planner
          </span>

          <h1>Study Planner</h1>

          <p>
            Plan your study sessions, stay focused and
            track your progress.
          </p>
        </div>

        <div className="planner-progress">
          <div className="progress-circle">
            <strong>{progress}%</strong>
          </div>

          <span>Overall Progress</span>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">📚</div>

          <div>
            <span>TOTAL SESSIONS</span>
            <h2>{totalSessions}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed-icon">
            ✓
          </div>

          <div>
            <span>COMPLETED</span>
            <h2>{completedSessions}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active-icon">
            ⏱
          </div>

          <div>
            <span>ACTIVE</span>
            <h2>{activeSessions}</h2>
          </div>
        </div>

      </div>

      {/* CREATE SESSION */}
      <div className="planner-card">

        <div className="card-heading">
          <div>
            <span className="small-label">
              PLAN YOUR STUDY
            </span>

            <h3>＋ Create New Session</h3>
          </div>
        </div>

        <div className="form-grid">

          <div className="input-group">
            <label>Subject</label>

            <input
              type="text"
              placeholder="e.g. Chemistry"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Topic</label>

            <input
              type="text"
              placeholder="e.g. Organic Chemistry"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Duration (minutes)</label>

            <input
              type="number"
              min="1"
              placeholder="25"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

        </div>

        <button
          className="add-btn"
          onClick={addSession}
        >
          <span>＋</span>
          Add Study Session
        </button>

      </div>

      {/* SESSION LIST */}
      <div className="planner-card sessions-card">

        <div className="sessions-header">
          <div>
            <span className="small-label">
              YOUR SCHEDULE
            </span>

            <h3>
              Study Sessions
              <span className="count-badge">
                {totalSessions}
              </span>
            </h3>
          </div>

          <div className="legend">
            <span>
              <i className="green-dot"></i>
              Active
            </span>

            <span>
              <i className="gray-dot"></i>
              Completed
            </span>
          </div>
        </div>

        {/* EMPTY STATE */}
        {sessions.length === 0 && (
          <div className="empty-state">
            <div>📖</div>

            <h3>No study sessions yet</h3>

            <p>
              Create your first study session above.
            </p>
          </div>
        )}

        {/* SESSIONS */}
        <div className="session-list">

          {sessions.map((session) => {

            const totalSeconds = session.duration * 60;

            const sessionProgress =
              totalSeconds === 0
                ? 0
                : Math.round(
                    ((totalSeconds - session.remaining) /
                      totalSeconds) *
                      100
                  );

            return (
              <div
                className={`session-item ${
                  session.status === "completed"
                    ? "session-completed"
                    : ""
                }`}
                key={session.id}
              >

                {/* SESSION INFO */}
                <div className="session-info">

                  <div className="session-title-row">

                    <div className="subject-icon">
                      {session.status === "completed"
                        ? "✓"
                        : "📘"}
                    </div>

                    <div>
                      <h4>{session.subject}</h4>

                      <p>{session.topic}</p>
                    </div>

                  </div>

                  <div className="session-progress-wrapper">

                    <div className="session-progress-bar">
                      <div
                        className="session-progress-fill"
                        style={{
                          width: `${sessionProgress}%`,
                        }}
                      ></div>
                    </div>

                    <span>
                      {sessionProgress}% complete
                    </span>

                  </div>

                </div>

                {/* TIMER */}
                <div className="session-timer">

                  <span className="timer-label">
                    {session.status === "completed"
                      ? "COMPLETED"
                      : session.isRunning
                      ? "STUDYING"
                      : "READY"}
                  </span>

                  <strong>
                    {formatTime(session.remaining)}
                  </strong>

                  <span className="duration-text">
                    {session.duration} min session
                  </span>

                </div>

                {/* ACTIONS */}
                <div className="session-actions">

                  {session.status !== "completed" && (
                    <button
                      className="timer-btn"
                      onClick={() =>
                        toggleTimer(session.id)
                      }
                    >
                      {session.isRunning
                        ? "⏸ Pause"
                        : "▶ Start"}
                    </button>
                  )}

                  <button
                    className="complete-btn"
                    onClick={() =>
                      completeSession(session.id)
                    }
                    disabled={
                      session.status === "completed"
                    }
                  >
                    ✓ Complete
                  </button>

                  <button
                    className="reset-btn"
                    onClick={() =>
                      resetTimer(session.id)
                    }
                  >
                    ↻
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteSession(session.id)
                    }
                  >
                    🗑
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
}

export default Planner;