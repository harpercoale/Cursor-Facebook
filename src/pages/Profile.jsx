import React from "react";

export function Profile() {
  return (
    <main>
      <div
        style={{
          height: 120,
          background: "linear-gradient(135deg, var(--fb-blue) 0%, #6b93d6 100%)",
        }}
      />
      <div style={{ padding: "0 16px 24px", marginTop: -44 }}>
        <img
          className="avatar"
          src="https://i.pravatar.cc/150?img=11"
          alt=""
          width={88}
          height={88}
          style={{ border: "4px solid var(--fb-surface)", borderRadius: "50%" }}
        />
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: "12px 0 4px" }}>Alexander Smith</h1>
        <p style={{ margin: 0, fontSize: 15, color: "var(--fb-text-secondary)" }}>
          Savannah, Georgia · they/them
        </p>
        <button
          type="button"
          className="btn-primary"
          style={{ width: "100%", marginTop: 16, padding: "10px 16px", fontSize: 16 }}
        >
          Edit profile
        </button>
      </div>
    </main>
  );
}
