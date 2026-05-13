import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconCheckCircle } from "../components/Icons.jsx";

export function JoinConfirmation() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const group = state?.group;

  if (!group) {
    return (
      <div className="app-shell">
        <div className="phone-frame" style={{ background: "var(--fb-surface)" }}>
          <header
            className="fb-header"
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/home")}
              style={{ position: "absolute", left: 8, fontSize: 17, color: "var(--fb-blue)" }}
            >
              Done
            </button>
            <span style={{ fontWeight: 700 }}>Groups</span>
          </header>
          <p className="empty-state">No group selected.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="phone-frame" style={{ background: "var(--fb-bg)" }}>
        <header
          className="fb-header"
          style={{
            borderBottom: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/home")}
            style={{ fontSize: 17, fontWeight: 600, color: "var(--fb-blue)", background: "none" }}
          >
            Done
          </button>
          <span style={{ fontWeight: 700, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            Request sent
          </span>
          <span style={{ width: 48 }} aria-hidden />
        </header>
        <div
          style={{
            padding: "32px 24px",
            textAlign: "center",
            background: "var(--fb-surface)",
            margin: 12,
            borderRadius: 8,
            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }} aria-hidden>
            <IconCheckCircle />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 12px" }}>Request sent</h1>
          <p style={{ color: "var(--fb-text-secondary)", fontSize: 15, lineHeight: 1.45, margin: 0 }}>
            Your request to join <strong style={{ color: "var(--fb-text)" }}>{group.name}</strong>{" "}
            was sent. You will get a notification when an admin responds.
          </p>
          <button
            type="button"
            className="btn-primary"
            style={{ marginTop: 24 }}
            onClick={() => navigate("/groups?panel=updates")}
          >
            View under Your groups
          </button>
          <button
            type="button"
            className="see-more-toggle"
            style={{ textAlign: "center", display: "block", width: "100%" }}
            onClick={() => navigate("/home")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
