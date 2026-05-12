import React from "react";
import { IconComment, IconLikeOutline, IconShare } from "../components/Icons.jsx";

const PLACEHOLDER_REELS = [
  { id: "r1", user: "savannah_outdoors", caption: "Sunrise on Tybee — sound on" },
  { id: "r2", user: "hostess_city", caption: "Forsyth fountain walkthrough" },
  { id: "r3", user: "lowcountry_eats", caption: "3 spots for shrimp & grits" },
];

export function Reels() {
  return (
    <main className="reels-page">
      {PLACEHOLDER_REELS.map((r, i) => (
        <div key={r.id} className="reels-card" style={{ background: i % 2 ? "#1c1e21" : "#2d3748" }}>
          <div className="reels-card-side">
            <div className="reels-avatar" aria-hidden />
            <div>
              <div className="reels-handle">{r.user}</div>
              <div className="reels-caption">{r.caption}</div>
            </div>
          </div>
          <div className="reels-card-actions">
            <button type="button" className="reels-action" aria-label="Like">
              <IconLikeOutline />
            </button>
            <button type="button" className="reels-action" aria-label="Comment">
              <IconComment />
            </button>
            <button type="button" className="reels-action" aria-label="Share">
              <IconShare />
            </button>
          </div>
        </div>
      ))}
      <p className="reels-disclaimer">Prototype reels — tap through for usability testing.</p>
    </main>
  );
}
