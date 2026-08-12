import { useState, useEffect } from "react";

export default function Pomodoro() {
  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (running && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [running, time]);

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,.1)",
        textAlign: "center",
      }}
    >
      <h2>Pomodoro Timer</h2>

      <h1 style={{ fontSize: "50px", margin: "20px 0" }}>
        {minutes}:{seconds}
      </h1>

      <button onClick={() => setRunning(true)}>Start</button>

      <button
        onClick={() => setRunning(false)}
        style={{ marginLeft: "10px" }}
      >
        Pause
      </button>

      <button
        onClick={() => {
          setRunning(false);
          setTime(25 * 60);
        }}
        style={{ marginLeft: "10px" }}
      >
        Reset
      </button>
    </div>
  );
}