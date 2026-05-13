import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GroupInfoModal } from "../components/GroupInfoModal.jsx";
import {
  IconClock,
  IconEnvelope,
  IconPin,
} from "../components/Icons.jsx";
import { JoinRequestSheet } from "../components/JoinRequestSheet.jsx";
import { useApp } from "../context/AppContext.jsx";
import {
  discoverGroups,
  filterGroupsByChip,
  getGroupCoverUrl,
  getGroupDisplayName,
  GROUP_FILTERS,
} from "../data/groups.js";

function GroupCard({
  group,
  displayName,
  coverUrl,
  pending,
  onJoin,
  onCancelPending,
  onOpenDetail,
  onDismiss,
  showDiscoverActions = true,
}) {
  return (
    <div
      className="group-card"
      role="button"
      tabIndex={0}
      onClick={onOpenDetail}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenDetail();
        }
      }}
    >
      <div className="group-card-cover">
        {coverUrl ? (
          <img src={coverUrl} alt="" className="group-card-photo" />
        ) : (
          <div className="group-card-cover-fallback" />
        )}
        {showDiscoverActions && (
          <button
            type="button"
            className="group-card-dismiss"
            aria-label="Dismiss"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss?.();
            }}
          >
            ✕
          </button>
        )}
      </div>
      <div className="group-card-body">
        <p className="group-card-name">{displayName}</p>
        <p className="group-card-meta">Private group · {group.memberCount}</p>
        {showDiscoverActions ? (
          <button
            type="button"
            className={`group-card-join${pending ? " group-card-join--pending" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              if (pending) onCancelPending?.();
              else onJoin();
            }}
          >
            {pending ? "Cancel request" : "Join"}
          </button>
        ) : (
          <p className="group-card-member-pill">Member</p>
        )}
      </div>
    </div>
  );
}

function YourGroupsUpdatesPanel() {
  const {
    pendingJoinRequests,
    groupInvites,
    inviteResponses,
    respondToInvite,
    withdrawJoinRequest,
    formatSavedTime,
  } = useApp();

  return (
    <>
      <div className="notif-section">
        <div className="notif-section-label">Pending groups</div>
        {pendingJoinRequests.length === 0 ? (
          <p className="notif-empty-hint">
            When you request to join a group, it will show here until you withdraw or an admin responds.
          </p>
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
              <strong>Savannah Trail Hikers</strong> — 6 new posts today. Members are sharing photos from the
              McQueen&apos;s Island Trail and Wormsloe.
            </div>
            <div className="notif-time">6h ago</div>
          </div>
        </div>
      </div>
    </>
  );
}

export function GroupsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    submitJoinRequest,
    hasPendingForGroup,
    withdrawJoinRequest,
    joinedGroupIds,
  } = useApp();
  const [sheetGroup, setSheetGroup] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeTab, setActiveTab] = useState("discover");
  const [yourSubTab, setYourSubTab] = useState("my-groups");
  const [detailGroup, setDetailGroup] = useState(null);
  const [dismissedIds, setDismissedIds] = useState(() => new Set());

  useEffect(() => {
    if (searchParams.get("panel") === "updates") {
      setActiveTab("your-groups");
      setYourSubTab("updates");
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (activeTab === "discover") return;
    setActiveFilter(null);
  }, [activeTab]);

  const visibleGroups = useMemo(() => {
    const filtered = filterGroupsByChip(discoverGroups, activeFilter);
    return filtered.filter((g) => !dismissedIds.has(g.id));
  }, [activeFilter, dismissedIds]);

  const joinedGroups = useMemo(
    () => discoverGroups.filter((g) => joinedGroupIds.has(g.id)),
    [joinedGroupIds]
  );

  const coverFilter = activeTab === "discover" ? activeFilter : null;
  const detailCover = detailGroup ? getGroupCoverUrl(detailGroup, coverFilter) : "";

  const openJoinSheet = (g) => {
    setDetailGroup(null);
    setSheetGroup({
      id: g.id,
      name: getGroupDisplayName(g, activeTab === "discover" ? activeFilter : null),
      category: g.category,
      memberCount: g.memberCount,
    });
  };

  const confirm = (group) => {
    submitJoinRequest(group);
    setSheetGroup(null);
    navigate("/join-confirmation", { state: { group } });
  };

  return (
    <main className="groups-page">
      <div className="groups-tabs">
        {[
          { key: "your-groups", label: "Your groups" },
          { key: "discover", label: "Discover" },
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            className={`groups-tab${activeTab === t.key ? " active" : ""}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "your-groups" && (
        <>
          <div className="notif-subtabs groups-your-subtabs" role="tablist" aria-label="Your groups sections">
            <button
              type="button"
              role="tab"
              aria-selected={yourSubTab === "my-groups"}
              className={`notif-subtab${yourSubTab === "my-groups" ? " active" : ""}`}
              onClick={() => setYourSubTab("my-groups")}
            >
              My groups
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={yourSubTab === "updates"}
              className={`notif-subtab${yourSubTab === "updates" ? " active" : ""}`}
              onClick={() => setYourSubTab("updates")}
            >
              Updates
            </button>
          </div>

          {yourSubTab === "my-groups" && (
            <>
              <div className="groups-section-title">Groups you&apos;ve joined</div>
              <div className="groups-grid">
                {joinedGroups.map((g) => (
                  <GroupCard
                    key={g.id}
                    group={g}
                    displayName={g.name}
                    coverUrl={getGroupCoverUrl(g, null)}
                    pending={false}
                    showDiscoverActions={false}
                    onOpenDetail={() => setDetailGroup(g)}
                  />
                ))}
              </div>
            </>
          )}

          {yourSubTab === "updates" && <YourGroupsUpdatesPanel />}
        </>
      )}

      {activeTab === "discover" && (
        <>
          <div className="groups-explore-row">
            <span className="groups-explore-heading">Explore</span>
            <span className="groups-location-pill">
              <svg width="12" height="14" viewBox="0 0 24 24" fill="#0064d1" aria-hidden>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5 1.12 2.5-2.5 2.5z" />
              </svg>
              Savannah
            </span>
          </div>

          <div className="groups-filters">
            {GROUP_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`groups-chip${activeFilter === f ? " active" : ""}`}
                onClick={() => setActiveFilter((prev) => (prev === f ? null : f))}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="groups-section-title">Suggested for you</div>

          <div className="groups-grid">
            {visibleGroups.map((g) => {
              const pending = hasPendingForGroup(g.id);
              const coverUrl = getGroupCoverUrl(g, activeFilter);
              return (
                <GroupCard
                  key={g.id}
                  group={g}
                  displayName={getGroupDisplayName(g, activeFilter)}
                  coverUrl={coverUrl}
                  pending={pending}
                  onJoin={() => openJoinSheet(g)}
                  onCancelPending={() => withdrawJoinRequest(g.id)}
                  onOpenDetail={() => setDetailGroup(g)}
                  onDismiss={() => setDismissedIds((prev) => new Set(prev).add(g.id))}
                />
              );
            })}
          </div>
        </>
      )}

      {detailGroup && (
        <GroupInfoModal
          group={detailGroup}
          displayName={getGroupDisplayName(detailGroup, coverFilter)}
          coverUrl={detailCover}
          pending={hasPendingForGroup(detailGroup.id)}
          isMember={joinedGroupIds.has(detailGroup.id)}
          onClose={() => setDetailGroup(null)}
          onVisit={() => setDetailGroup(null)}
          onJoin={() => openJoinSheet(detailGroup)}
          onCancelRequest={() => withdrawJoinRequest(detailGroup.id)}
        />
      )}

      {sheetGroup && (
        <JoinRequestSheet
          group={sheetGroup}
          onCancel={() => setSheetGroup(null)}
          onConfirm={confirm}
        />
      )}
    </main>
  );
}
