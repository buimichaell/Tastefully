import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      setOutput("");

      const res = await axios.post("http://localhost:3001/recommend", {
        prompt,
      });

      setOutput(res.data.output);
    } catch (err) {
      setError("Backend not responding. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Tastefully</h1>
        <p style={styles.subtitle}>
          Your Fitment Advisor for all Cars
        </p>

        <textarea
          style={styles.textarea}
          placeholder="Describe your setup (e.g. WRX aggressive stance 18x9.5 +22)..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button style={styles.button} onClick={handleSubmit}>
          {loading ? "Generating..." : "Generate Recommendation"}
        </button>

        {error && <div style={styles.errorBox}>{error}</div>}

        {output && (
          <div style={styles.outputBox}>
            <pre style={styles.pre}>{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial",
  },
  container: {
    width: "100%",
    maxWidth: "700px",
    backgroundColor: "#111827",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    color: "white",
  },
  title: {
    fontSize: "32px",
    marginBottom: "5px",
  },
  subtitle: {
    color: "#9ca3af",
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    height: "120px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    marginBottom: "15px",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3b82f6",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "15px",
  },
  outputBox: {
    backgroundColor: "#1f2937",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "15px",
    border: "1px solid #374151",
  },
  pre: {
    whiteSpace: "pre-wrap",
    fontSize: "13px",
    lineHeight: "1.4",
  },
  errorBox: {
    backgroundColor: "#7f1d1d",
    color: "#fecaca",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px",
  },
};

export default App;