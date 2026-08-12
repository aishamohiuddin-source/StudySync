function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="tag">
          🎓 Smart Learning Platform
        </span>

        <h1>
          Study Smarter,
          <br />
          Achieve More
        </h1>

        <p>
          Organize your study schedule, track your progress,
          stay focused with the Pomodoro timer and reach your goals.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Get Started
          </button>

          <button className="secondary-btn">
            Learn More
          </button>
        </div>

      </div>

      <div className="hero-right">

        <div className="hero-image">

          <div className="circle"></div>

          <div className="laptop">
            💻
          </div>

          <div className="book">
            📚
          </div>

          <div className="clock">
            ⏰
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;