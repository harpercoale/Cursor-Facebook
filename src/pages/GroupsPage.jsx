import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GroupInfoModal } from "../components/GroupInfoModal.jsx";
import { JoinRequestSheet } from "../components/JoinRequestSheet.jsx";
import { useApp } from "../context/AppContext.jsx";
import {
  discoverGroups,
  filterGroupsByChip,
  getGroupCoverUrl,
  getGroupDisplayName,
  GROUP_FILTERS,
} from "../data/groups.js";

function GroupCard({ group, displayName, coverUrl, pending, onJoin, onCancelPending, onOpenDetail, onDismiss }) {
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
      </div>
      <div className="group-card-body">
        <p className="group-card-name">{displayName}</p>
        <p className="group-card-meta">Private group · {group.memberCount}</p>
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
      </div>
    </div>
  );
}

export function GroupsPage() {
  const navigate = useNavigate();
  const { submitJoinRequest, hasPendingForGroup, withdrawJoinRequest } = useApp();
  const [sheetGroup, setSheetGroup] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeTab, setActiveTab] = useState("discover");
  const [detailGroup, setDetailGroup] = useState(null);
  const [dismissedIds, setDismissedIds] = useState(() => new Set());

  const visibleGroups = useMemo(() => {
    const filtered = filterGroupsByChip(discoverGroups, activeFilter);
    return filtered.filter((g) => !dismissedIds.has(g.id));
  }, [activeFilter, dismissedIds]);

  const detailCover = detailGroup ? getGroupCoverUrl(detailGroup, activeFilter) : "";

  const openJoinSheet = (g) => {
    setDetailGroup(null);
    setSheetGroup({
      id: g.id,
      name: getGroupDisplayName(g, activeFilter),
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
          { key: "for-you", label: "For you" },
          { key: "your-groups", label: "Your groups" },
          { key: "discover", label: "Discover" },
          { key: "manage", label: "Manage" },
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

      <div className="groups-explore-row">
        <span className="groups-explore-heading">Explore</span>
        <span className="groups-location-pill">
          <svg width="12" height="14" viewBox="0 0 24 24" fill="#0064d1" aria-hidden>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
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

      {detailGroup && (
        <GroupInfoModal
          group={detailGroup}
          displayName={getGroupDisplayName(detailGroup, activeFilter)}
          coverUrl={detailCover}
          pending={hasPendingForGroup(detailGroup.id)}
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
