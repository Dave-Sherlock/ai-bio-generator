import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateBio() {
    setLoading(true);
    setError("");
    setBio("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role }),
      });

      const data = await response.json();
      if (response.ok) {
        setBio(data.bio);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    }

    setLoading(false);
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>AI Bio Generator</h1>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />
      <input
        type="text"
        placeholder="Your profession or role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />

      <button onClick={generateBio} disabled={loading}>
        {loading ? "Generating..." : "Generate Bio"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {bio && (
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
          <h2>Generated Bio:</h2>
          <p>{bio}</p>
        </div>
      )}
    </main>
  );
}
