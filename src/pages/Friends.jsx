import React from "react";

const suggestions = [
  { name: "Morgan Whitaker", mutual: "12 mutual friends · Savannah", img: "https://i.pravatar.cc/150?img=3" },
  { name: "Chris Delgado", mutual: "5 mutual friends · Pooler", img: "https://i.pravatar.cc/150?img=8" },
  { name: "Sam Okafor", mutual: "1 mutual friend · Tybee Island", img: "https://i.pravatar.cc/150?img=16" },
];

export function Friends() {
  return (
    <main>
      <div style={{ padding: "12px 16px", background: "var(--fb-surface)", marginBottom: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 12 }}>Friend requests</div>
        <p style={{ color: "var(--fb-text-secondary)", fontSize: 15, margin: 0 }}>
          No new requests
        </p>
      </div>
      <div className="menu-section-title">People you may know</div>
      <div className="menu-list">
        {suggestions.map((p) => (
          <div key={p.name} className="menu-row" style={{ cursor: "default" }}>
            <img className="avatar" src={p.img} alt="" width={48} height={48} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 13, color: "var(--fb-text-secondary)" }}>{p.mutual}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ width: "auto", flex: 1, padding: "8px 12px", fontSize: 15 }}
                >
                  Add friend
                </button>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    background: "var(--fb-bg)",
                    fontWeight: 600,
                    borderRadius: 6,
                    padding: "8px 12px",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
