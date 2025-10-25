import React, { useEffect } from "react";

export default function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    if (!onClose) return;
    const t = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const bg = type === "error" ? "#b00020" : type === "success" ? "#0a7a3a" : "#222";
  const style = {
    position: "fixed",
    top: 12,
    left: "50%",
    transform: "translateX(-50%)",
    background: bg,
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 8,
    zIndex: 9999,
    boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
    maxWidth: "90%",
    textAlign: "center"
  };

  if (!message) return null;
  return (
    <div style={style} role="status" aria-live="polite">
      {message}
    </div>
  );
}
