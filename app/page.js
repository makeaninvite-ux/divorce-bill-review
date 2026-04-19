export default function Home() {
  return (
    <main style={{ maxWidth: 880, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ borderBottom: "1px solid #c9c4bb", paddingBottom: 20, marginBottom: 36 }}>
        <div style={{ fontSize: 14, letterSpacing: 1.2, textTransform: "uppercase", color: "#8a8680", marginBottom: 8 }}>
          Divorce Bill Review
        </div>
        <h1 style={{ margin: 0, fontSize: 44, lineHeight: 1.05, fontWeight: 700 }}>
          Know what to question.
        </h1>
      </div>

      <p style={{ fontSize: 18, lineHeight: 1.7, color: "#5f5b55", maxWidth: 700, marginBottom: 28 }}>
        Upload your divorce attorney invoice. We read each line item and flag entries worth following up on.
      </p>

      <div style={{ background: "#f0eee9", border: "1px solid #c9c4bb", borderRadius: 8, padding: 24, marginBottom: 20 }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Current starter</div>
        <div style={{ color: "#5f5b55", lineHeight: 1.7, marginBottom: 16 }}>
          This is the clean Vercel starter. The page is live first. The AI endpoint is included separately at <code>/api/analyze</code>.
        </div>
        <input type="file" style={{ display: "block", marginBottom: 12 }} />
        <button style={{ background: "#1a1d21", color: "#faf8f3", border: 0, borderRadius: 6, padding: "14px 18px", fontWeight: 600, cursor: "pointer" }}>
          Find Items to Question
        </button>
      </div>

      <div style={{ fontSize: 14, color: "#8a8680", lineHeight: 1.7 }}>
        This starter is intentionally minimal so it deploys cleanly on Vercel before adding the rest of the product.
      </div>
    </main>
  );
}
