import { useState } from "react";

export default function Home() {
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateBio() {
    setLoading(true);
    setBio("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      if (response.ok) {
        setBio(data.bio);
      } else {
        setBio("Error: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      setBio("Request failed: " + error.message);
    }
    setLoading(false);
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>AI Bio Generator</h1>
      <button onClick={generateBio} disabled={loading}>
        {loading ? "Generating..." : "Generate Bio"}
      </button>
      {bio && (
        <section style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
          <h2>Generated Bio:</h2>
          <p>{bio}</p>
        </section>
      )}
    </main>
  );
}
