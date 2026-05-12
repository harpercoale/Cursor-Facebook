import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JoinRequestSheet } from "../components/JoinRequestSheet.jsx";
import { PostCard } from "../components/PostCard.jsx";
import { useApp } from "../context/AppContext.jsx";
import { feedPosts } from "../data/feed.js";

export function HomeFeed() {
  const navigate = useNavigate();
  const { submitJoinRequest } = useApp();
  const [sheetGroup, setSheetGroup] = useState(null);

  const handleConfirmJoin = (group) => {
    submitJoinRequest(group);
    setSheetGroup(null);
    navigate("/join-confirmation", { state: { group } });
  };

  return (
    <>
      <main style={{ paddingTop: 4 }}>
        {feedPosts.map((post) => (
          <PostCard key={post.id} post={post} onRequestJoin={(g) => setSheetGroup(g)} />
        ))}
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
