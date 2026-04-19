"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function handleSubmit() {
    if (!file) return;

    setLoading(true);
    setResult("");

    const text = await file.text();

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Analyze this legal invoice and flag questionable items:\n\n${text}`,
      }),
    });

    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
    setLoading(false);
  }

  return (
    <main style={{ padding: 40, maxWidth: 800 }}>
      <h1>Divorce Bill Review</h1>
      <p>Know what to question.</p>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <br /><br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Find Items to Question"}
      </button>

      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
        {result}
      </pre>
    </main>
  );
}
