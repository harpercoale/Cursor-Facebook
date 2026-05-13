import React from "react";
import {
  IconComment,
  IconPhoto,
  IconPin,
  IconThumbsUp,
} from "../components/Icons.jsx";
import { useApp } from "../context/AppContext.jsx";

function NotifGlyph({ type }) {
  switch (type) {
    case "like":
      return <IconThumbsUp />;
    case "comment":
      return <IconComment />;
    case "photo":
      return <IconPhoto />;
    default:
      return <IconPin />;
  }
}

export function Notifications() {
  const { generalNotifications } = useApp();

  return (
    <main className="notifications-page">
      <div className="notif-section">
        <div className="notif-section-label">Earlier</div>
        {generalNotifications.map((n) => (
          <div key={n.id} className="notif-item">
            <div className="notif-icon-wrap" aria-hidden>
              <NotifGlyph type={n.iconType} />
            </div>
            <div className="notif-body">
              <div className="notif-title">{n.title}</div>
              <div className="notif-time">{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
