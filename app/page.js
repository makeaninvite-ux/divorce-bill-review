"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const str = reader.result || "";
        const base64 = String(str).split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleSubmit() {
    try {
      setError("");
      setResult("");

      if (!file) {
        setError("Choose a PDF or image first.");
        return;
      }

      const allowed = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/webp",
      ];

      if (!allowed.includes(file.type)) {
        setError("Use a PDF, PNG, JPG, or WEBP file.");
        return;
      }

      setLoading(true);

      const fileData = await toBase64(file);

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed.");
      }

      setResult(data.text || "No response returned.");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 40, maxWidth: 900, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 56, marginBottom: 20 }}>Divorce Bill Review</h1>
      <p style={{ fontSize: 20, marginBottom: 24 }}>Know what to question.</p>

      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <div style={{ marginTop: 20 }}>
        <button
          onClick={handleSubmit}
          disabled={loading || !file}
          style={{
            padding: "10px 16px",
            fontSize: 16,
            cursor: loading || !file ? "default" : "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Find Items to Question"}
        </button>
      </div>

      {error ? (
        <div style={{ marginTop: 20, color: "#b00020", whiteSpace: "pre-wrap" }}>
          {error}
        </div>
      ) : null}

      {result ? (
        <pre
          style={{
            marginTop: 24,
            whiteSpace: "pre-wrap",
            background: "#f5f5f5",
            padding: 16,
            borderRadius: 8,
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          {result}
        </pre>
      ) : null}
    </main>
  );
}
