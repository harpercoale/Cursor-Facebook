import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { discoverGroups } from "../data/groups.js";

const AppContext = createContext(null);

const initialGeneralNotifications = [
  {
    id: "g1",
    iconType: "like",
    title: "Riley Mercer and 4 others reacted to your photo from Fort McAllister State Park.",
    time: "2h",
  },
  {
    id: "g2",
    iconType: "comment",
    title: "Jordan Walsh commented on your post: \"What time are you launching Sunday?\"",
    time: "5h",
  },
  {
    id: "g3",
    iconType: "photo",
    title: "On this day 3 years ago you checked in at Forsyth Park, Savannah.",
    time: "1d",
  },
];

function buildSavedPostRecord(post) {
  const text = post.text?.replace(/\s+/g, " ").trim() || "";
  const preview = text.length > 80 ? `${text.slice(0, 80)}…` : text;
  if (post.type === "group_discovery" && post.group) {
    return {
      id: post.id,
      title: post.group.name,
      meta: `Suggested group · ${post.author}`,
      savedAt: Date.now(),
    };
  }
  return {
    id: post.id,
    title: preview || "Saved post",
    meta: post.author || "",
    savedAt: Date.now(),
  };
}

function formatSavedTime(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? "1d ago" : `${d}d ago`;
}

/** Seeded “already joined” groups for the Your groups tab (Savannah-themed). */
const INITIAL_JOINED_GROUP_IDS = [
  "g-sav-food",
  "g-lowcountry-eats",
  "g-sav-music",
  "g-history-walks",
  "g-sav-tech",
];

const INITIAL_GROUP_INVITES = [
  {
    id: "inv1",
    groupId: "g-longleaf-hike",
    groupName: "Savannah Longleaf Hiking Society",
    members: "2.4K members · Savannah, GA",
    time: "3h",
  },
  {
    id: "inv2",
    groupId: "g-ogeechee-paddle",
    groupName: "Georgia Coast Kayak Collective",
    members: "3.1K members · Coastal GA",
    time: "1d",
  },
];

/** Pre-filled pending requests (Your groups → Updates). North GA hiking is not listed here — it stays joinable from Discover and the feed only. */
const INITIAL_PENDING_GROUP_IDS = [
  "g-hike-ga",
  "g-wild-women",
  "g-plant-sav",
  "g-coast-birding",
  "g-ga-outdoor",
];

function buildInitialPendingJoinRequests() {
  const t = Date.now();
  return INITIAL_PENDING_GROUP_IDS.map((groupId, i) => {
    const g = discoverGroups.find((row) => row.id === groupId);
    if (!g) return null;
    return {
      groupId: g.id,
      groupName: g.name,
      category: g.category,
      memberCount: g.memberCount,
      requestedAt: t - (i + 1) * 7200000,
    };
  }).filter(Boolean);
}

export function AppProvider({ children }) {
  const [likedPosts, setLikedPosts] = useState(() => new Set());
  const [savedPostRecords, setSavedPostRecords] = useState(() => []);
  const [pendingJoinRequests, setPendingJoinRequests] = useState(() => buildInitialPendingJoinRequests());
  const [inviteResponses, setInviteResponses] = useState({});
  const [joinedGroupIds, setJoinedGroupIds] = useState(() => new Set(INITIAL_JOINED_GROUP_IDS));

  const toggleLike = useCallback((postId) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  }, []);

  const toggleSavePost = useCallback((post) => {
    if (!post?.id) return;
    setSavedPostRecords((prev) => {
      const exists = prev.some((r) => r.id === post.id);
      if (exists) return prev.filter((r) => r.id !== post.id);
      return [buildSavedPostRecord(post), ...prev];
    });
  }, []);

  const isPostSaved = useCallback(
    (postId) => savedPostRecords.some((r) => r.id === postId),
    [savedPostRecords]
  );

  const submitJoinRequest = useCallback((group) => {
    setPendingJoinRequests((prev) => {
      if (prev.some((p) => p.groupId === group.id)) return prev;
      return [
        ...prev,
        {
          groupId: group.id,
          groupName: group.name,
          category: group.category,
          memberCount: group.memberCount,
          requestedAt: Date.now(),
        },
      ];
    });
  }, []);

  const hasPendingForGroup = useCallback(
    (groupId) => pendingJoinRequests.some((p) => p.groupId === groupId),
    [pendingJoinRequests]
  );

  const withdrawJoinRequest = useCallback((groupId) => {
    if (!groupId) return;
    setPendingJoinRequests((prev) => prev.filter((p) => p.groupId !== groupId));
  }, []);

  const joinGroupId = useCallback((groupId) => {
    if (!groupId) return;
    setJoinedGroupIds((prev) => new Set(prev).add(groupId));
  }, []);

  const respondToInvite = useCallback(
    (inviteId, action) => {
      setInviteResponses((prev) => ({ ...prev, [inviteId]: action }));
      if (action === "joined") {
        const inv = INITIAL_GROUP_INVITES.find((i) => i.id === inviteId);
        if (inv?.groupId) joinGroupId(inv.groupId);
      }
    },
    [joinGroupId]
  );

  const isJoinedGroup = useCallback((groupId) => joinedGroupIds.has(groupId), [joinedGroupIds]);

  const value = useMemo(
    () => ({
      likedPosts,
      toggleLike,
      savedPostRecords,
      toggleSavePost,
      isPostSaved,
      formatSavedTime,
      pendingJoinRequests,
      submitJoinRequest,
      withdrawJoinRequest,
      hasPendingForGroup,
      joinedGroupIds,
      joinGroupId,
      isJoinedGroup,
      generalNotifications: initialGeneralNotifications,
      groupInvites: INITIAL_GROUP_INVITES,
      inviteResponses,
      respondToInvite,
    }),
    [
      likedPosts,
      toggleLike,
      savedPostRecords,
      toggleSavePost,
      isPostSaved,
      formatSavedTime,
      pendingJoinRequests,
      submitJoinRequest,
      withdrawJoinRequest,
      hasPendingForGroup,
      joinedGroupIds,
      joinGroupId,
      isJoinedGroup,
      inviteResponses,
      respondToInvite,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
