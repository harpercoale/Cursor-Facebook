import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  IconClock,
  IconComment,
  IconEnvelope,
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [subTab, setSubTab] = useState(() => (searchParams.get("tab") === "groups" ? "groups" : "all"));

  useEffect(() => {
    if (searchParams.get("tab") === "groups") setSubTab("groups");
  }, [searchParams]);

  const {
    pendingJoinRequests,
    generalNotifications,
    groupInvites,
    inviteResponses,
    respondToInvite,
    withdrawJoinRequest,
    formatSavedTime,
  } = useApp();

  return (
    <main className="notifications-page">
      <div className="notif-subtabs" role="tablist" aria-label="Notification categories">
        <button
          type="button"
          role="tab"
          aria-selected={subTab === "all"}
          className={`notif-subtab${subTab === "all" ? " active" : ""}`}
          onClick={() => {
            setSubTab("all");
            setSearchParams({}, { replace: true });
          }}
        >
          All
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={subTab === "groups"}
          className={`notif-subtab${subTab === "groups" ? " active" : ""}`}
          onClick={() => {
            setSubTab("groups");
            setSearchParams({ tab: "groups" }, { replace: true });
          }}
        >
          Groups
        </button>
      </div>

      {subTab === "all" && (
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
      )}

      {subTab === "groups" && (
        <>
          <div className="notif-section">
            <div className="notif-section-label">Pending groups</div>
            {pendingJoinRequests.length === 0 ? (
              <p className="notif-empty-hint">When you request to join a group, it will show here until you withdraw or an admin responds.</p>
            ) : (
              pendingJoinRequests.map((req) => (
                <div key={req.groupId} className="notif-item">
                  <div className="notif-icon-wrap" aria-hidden>
                    <IconClock />
                  </div>
                  <div className="notif-body">
                    <div className="notif-title">
                      Your request to join <strong>{req.groupName}</strong> is pending admin review.
                    </div>
                    <div className="notif-time">{formatSavedTime(req.requestedAt)}</div>
                    <span className="status-pill pending">Pending</span>
                    <div className="notif-row-actions">
                      <button
                        type="button"
                        className="notif-text-btn"
                        onClick={() => withdrawJoinRequest(req.groupId)}
                      >
                        Withdraw request
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="notif-section">
            <div className="notif-section-label">Invites</div>
            {groupInvites.map((inv) => {
              const resp = inviteResponses[inv.id];
              if (resp === "declined") return null;
              return (
                <div key={inv.id} className="notif-item">
                  <div className="notif-icon-wrap" aria-hidden>
                    <IconEnvelope />
                  </div>
                  <div className="notif-body">
                    <div className="notif-title">
                      You are invited to join <strong>{inv.groupName}</strong>.
                    </div>
                    <div className="notif-time">
                      {inv.time} · {inv.members}
                    </div>
                    {resp === "joined" ? (
                      <span className="status-pill">Joined</span>
                    ) : (
                      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                        <button
                          type="button"
                          className="btn-primary"
                          style={{ margin: 0, flex: 1, padding: "8px 10px", fontSize: 14 }}
                          onClick={() => respondToInvite(inv.id, "joined")}
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          style={{
                            flex: 1,
                            background: "var(--fb-bg)",
                            fontWeight: 700,
                            borderRadius: 6,
                            padding: "8px 10px",
                            fontSize: 14,
                          }}
                          onClick={() => respondToInvite(inv.id, "declined")}
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="notif-section">
            <div className="notif-section-label">Group activity</div>
            <div className="notif-item">
              <div className="notif-icon-wrap" aria-hidden>
                <IconPin />
              </div>
              <div className="notif-body">
                <div className="notif-title">
                  <strong>Savannah Trail Hikers</strong> — 6 new posts today. Members are sharing photos from
                  the McQueen&apos;s Island Trail and Wormsloe.
                </div>
                <div className="notif-time">6h ago</div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
