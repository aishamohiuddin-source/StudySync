export default function TaskList() {
  const tasks = [
    "React Practice",
    "Database Assignment",
    "Study Node.js",
    "Prepare Presentation",
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,.1)",
        marginTop: "30px",
      }}
    >
      <h2>Today's Tasks</h2>

      {tasks.map((task, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          <input type="checkbox" />
          <span>{task}</span>
        </div>
      ))}
    </div>
  );
}