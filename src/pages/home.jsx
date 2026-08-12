import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* ================= HERO SECTION ================= */}

      <section className="hero">

        <div className="hero-left">

          <div className="tag">
            <span>📖</span>
            Smart Study Planner
          </div>

          <h1>
            Welcome to
            <br />
            <span>StudySync</span>
          </h1>

          <h3>
            Your Smart Study Planner & Productivity Tracker
          </h3>

          <p>
            Plan your study sessions, organize your daily tasks,
            stay focused with the Pomodoro technique and track
            your productivity — all in one place.
          </p>

          <button
            className="start-btn"
            onClick={() => navigate("/planner")}
          >
            🚀 Start Planning Now
            <span>→</span>
          </button>

        </div>


        {/* HERO VISUAL */}

        <div className="hero-right">

          <div className="hero-image">

            <div className="circle"></div>

            <div className="book book-one">
              📚
            </div>

            <div className="book book-two">
              📗
            </div>

            <div className="clock">
              ⏱️
            </div>

            <div className="plant">
              🌿
            </div>

            <div className="mini-card">
              <span>✓</span>
              Stay Productive
            </div>

          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="stats">

        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div>
            <h3>Study Planning</h3>
            <p>Organize your tasks</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div>
            <h3>Pomodoro</h3>
            <p>Stay focused</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div>
            <h3>Analytics</h3>
            <p>Track progress</p>
          </div>
        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="features">

        <div className="section-heading">

          <span className="section-label">
           
          </span>

          <h2>
            Everything You Need to
            <span> Study Smarter</span>
          </h2>

          <p>
            Simple tools designed to help you organize,
            focus and improve your study routine.
          </p>

        </div>


        <div className="feature-grid">

          {/* Feature 1 */}

          <div className="feature-card">

            <div className="feature-icon green-icon">
              ⏱️
            </div>

            <h3>
              Pomodoro Timer
            </h3>

            <p>
              Use focused study sessions with breaks
              to improve concentration and productivity.
            </p>

            <div className="feature-link">
              Stay Focused →
            </div>

          </div>


          {/* Feature 2 */}

          <div className="feature-card">

            <div className="feature-icon grey-icon">
              📘
            </div>

            <h3>
              Study Planning
            </h3>

            <p>
              Create tasks, organize your study work
              and keep everything in one place.
            </p>

            <div
              className="feature-link"
              onClick={() => navigate("/planner")}
            >
              Plan Your Study →
            </div>

          </div>


          {/* Feature 3 */}

          <div className="feature-card">

            <div className="feature-icon green-icon">
              📊
            </div>

            <h3>
              Analytics Dashboard
            </h3>

            <p>
              Monitor your completed tasks and understand
              your study progress easily.
            </p>

            <div className="feature-link">
              View Progress →
            </div>

          </div>


          {/* Feature 4 */}

          <div className="feature-card">

            <div className="feature-icon grey-icon">
              💾
            </div>

            <h3>
              Local Storage
            </h3>

            <p>
              Your study tasks stay saved in your browser
              so your data remains available.
            </p>

            <div className="feature-link">
              Data Saved →
            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="bottom-cta">

        <div>
          <span>🌿</span>

          <h2>
            Ready to organize your studies?
          </h2>

          <p>
            Start planning your next study session today.
          </p>
        </div>

        <button
          onClick={() => navigate("/planner")}
        >
          Open Study Planner →
        </button>

      </section>

    </div>
  );
}

export default Home;