export default function FeatureCard({ title, text, emoji }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
        textAlign: "center",
        boxShadow: "0 5px 15px rgba(0,0,0,.1)",
      }}
    >
      <div style={{ fontSize: "40px" }}>{emoji}</div>

      <h3 style={{ marginTop: "15px" }}>{title}</h3>

      <p style={{ color: "#666", marginTop: "10px" }}>
        {text}
      </p>
    </div>
  );
}