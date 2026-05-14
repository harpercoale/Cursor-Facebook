import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JoinRequestSheet } from "../components/JoinRequestSheet.jsx";
import { PostCard } from "../components/PostCard.jsx";
import { useApp } from "../context/AppContext.jsx";
import { getFeedPostById } from "../data/feed.js";

export function SavedPostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { submitJoinRequest } = useApp();
  const [sheetGroup, setSheetGroup] = useState(null);

  const post = useMemo(() => (postId ? getFeedPostById(postId) : null), [postId]);

  const handleConfirmJoin = (group) => {
    submitJoinRequest(group);
    setSheetGroup(null);
    navigate("/join-confirmation", { state: { group } });
  };

  if (!post) {
    return (
      <main style={{ padding: 24 }}>
        <p className="saved-empty-hint">This post is not available.</p>
      </main>
    );
  }

  return (
    <>
      <main style={{ paddingTop: 4 }}>
        <PostCard post={post} onRequestJoin={(g) => setSheetGroup(g)} />
      </main>
      {sheetGroup && (
        <JoinRequestSheet
          group={sheetGroup}
          onCancel={() => setSheetGroup(null)}
          onConfirm={handleConfirmJoin}
        />
      )}
    </>
  );
}
