export const metadata = {
  title: "Divorce Bill Review",
  description: "Know what to question"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#faf8f3", color: "#1a1d21", fontFamily: "Inter, system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
