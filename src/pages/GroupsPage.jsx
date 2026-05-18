import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GroupInfoModal } from "../components/GroupInfoModal.jsx";
import { IconEnvelope } from "../components/Icons.jsx";
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
  isMember,
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
          isMember ? (
            <button
              type="button"
              className="group-card-join group-card-join--visit"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail?.();
              }}
            >
              Visit
            </button>
          ) : (
            <button
              type="button"
              className={`group-card-join${pending ? " group-card-join--pending" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                if (pending) onCancelPending?.();
                else onJoin?.();
              }}
            >
              {pending ? "Cancel request" : "Join"}
            </button>
          )
        ) : (
          <p className="group-card-member-pill">Member</p>
        )}
      </div>
    </div>
  );
}

function PendingGroupRow({ req, coverUrl, formatSavedTime, onOpen, onWithdraw }) {
  return (
    <div
      className="groups-compact-row groups-compact-row--pending"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="groups-compact-thumb" aria-hidden>
        {coverUrl ? (
          <img src={coverUrl} alt="" className="groups-compact-thumb-img" />
        ) : (
          <div className="groups-compact-thumb-fallback" />
        )}
      </div>
      <div className="groups-compact-main">
        <span className="groups-compact-title">{req.groupName}</span>
        <span className="groups-compact-meta">Pending · {formatSavedTime(req.requestedAt)}</span>
      </div>
      <button
        type="button"
        className="groups-compact-action"
        onClick={(e) => {
          e.stopPropagation();
          onWithdraw();
        }}
      >
        Withdraw
      </button>
    </div>
  );
}

function GroupInviteRow({ invite, response, onAccept, onDecline, onOpen }) {
  return (
    <div className="groups-compact-row groups-compact-row--invite">
      <button type="button" className="groups-compact-row-hit" onClick={onOpen} aria-label={`View ${invite.groupName}`}>
        <span className="groups-compact-icon" aria-hidden>
          <IconEnvelope />
        </span>
        <span className="groups-compact-main">
          <span className="groups-compact-title">{invite.groupName}</span>
          <span className="groups-compact-meta">
            {invite.time} · {invite.members}
          </span>
        </span>
      </button>
      {response === "joined" ? (
        <span className="groups-compact-status">Joined</span>
      ) : (
        <span className="groups-compact-invite-btns">
          <button type="button" className="groups-compact-invite-btn groups-compact-invite-btn--primary" onClick={onAccept}>
            Accept
          </button>
          <button type="button" className="groups-compact-invite-btn" onClick={onDecline}>
            Decline
          </button>
        </span>
      )}
    </div>
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
    pendingJoinRequests,
    formatSavedTime,
    groupInvites,
    inviteResponses,
    respondToInvite,
  } = useApp();
  const [sheetGroup, setSheetGroup] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeTab, setActiveTab] = useState("discover");
  const [detailGroup, setDetailGroup] = useState(null);
  const [dismissedIds, setDismissedIds] = useState(() => new Set());

  useEffect(() => {
    if (searchParams.get("tab") === "your-groups") {
      setActiveTab("your-groups");
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (activeTab === "discover") return;
    setActiveFilter(null);
  }, [activeTab]);

  const sortedPendingJoinRequests = useMemo(
    () => [...pendingJoinRequests].sort((a, b) => b.requestedAt - a.requestedAt),
    [pendingJoinRequests]
  );

  const visibleInvites = useMemo(
    () => groupInvites.filter((inv) => inviteResponses[inv.id] !== "declined"),
    [groupInvites, inviteResponses]
  );

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

  const openGroupDetail = (groupId) => {
    const fullGroup = discoverGroups.find((g) => g.id === groupId);
    if (fullGroup) setDetailGroup(fullGroup);
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
          <div className="groups-section-title">Groups you&apos;ve joined</div>
          {joinedGroups.length === 0 ? (
            <p className="notif-empty-hint">Groups you join will appear here.</p>
          ) : (
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
          )}

          <div className="groups-section-title">Pending requests</div>
          {pendingJoinRequests.length === 0 ? (
            <p className="notif-empty-hint groups-section-hint">No pending join requests.</p>
          ) : (
            <div className="groups-compact-list">
              {sortedPendingJoinRequests.map((req) => {
                const fullGroup = discoverGroups.find((g) => g.id === req.groupId);
                const coverUrl = fullGroup ? getGroupCoverUrl(fullGroup, null) : null;
                return (
                  <PendingGroupRow
                    key={req.groupId}
                    req={req}
                    coverUrl={coverUrl}
                    formatSavedTime={formatSavedTime}
                    onOpen={() => openGroupDetail(req.groupId)}
                    onWithdraw={() => withdrawJoinRequest(req.groupId)}
                  />
                );
              })}
            </div>
          )}

          <div className="groups-section-title">Group invites</div>
          {visibleInvites.length === 0 ? (
            <p className="notif-empty-hint groups-section-hint">No group invites right now.</p>
          ) : (
            <div className="groups-compact-list">
              {visibleInvites.map((inv) => (
                <GroupInviteRow
                  key={inv.id}
                  invite={inv}
                  response={inviteResponses[inv.id]}
                  onAccept={() => respondToInvite(inv.id, "joined")}
                  onDecline={() => respondToInvite(inv.id, "declined")}
                  onOpen={() => openGroupDetail(inv.groupId)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "discover" && (
        <>
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
              const member = joinedGroupIds.has(g.id);
              const coverUrl = getGroupCoverUrl(g, activeFilter);
              return (
                <GroupCard
                  key={g.id}
                  group={g}
                  displayName={getGroupDisplayName(g, activeFilter)}
                  coverUrl={coverUrl}
                  pending={pending}
                  isMember={member}
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
