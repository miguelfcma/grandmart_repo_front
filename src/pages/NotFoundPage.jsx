import React from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f8f8f8",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "5rem",
    marginBottom: "1rem",
    color: "#333",
    textShadow: "2px 2px 0 #ddd",
  },
  message: {
    fontSize: "2rem",
    color: "#666",
  },
};

export function NotFoundPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 Not Found</h1>
      <p style={styles.message}>The page you are looking for does not exist.</p>
    </div>
  );
}
