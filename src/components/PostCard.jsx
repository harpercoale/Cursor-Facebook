import React, { useMemo, useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { CommentSheet } from "./CommentSheet.jsx";
import { enrichGroupFromDiscover } from "../data/groups.js";
import {
  IconBookmark,
  IconBookmarkOutline,
  IconComment,
  IconLikeFilled,
  IconLikeOutline,
  IconMoreHorizontal,
  IconShare,
} from "./Icons.jsx";

function formatCount(n, likedDelta) {
  const v = Math.max(0, n + likedDelta);
  if (v === 0) return null;
  if (v >= 1000) return `${(v / 1000).toFixed(1)}K`;
  return String(v);
}

export function PostCard({ post, onRequestJoin }) {
  const { likedPosts, toggleLike, isPostSaved, toggleSavePost, hasPendingForGroup, withdrawJoinRequest } =
    useApp();
  const liked = likedPosts.has(post.id);
  const saved = isPostSaved(post.id);
  const [likeBump, setLikeBump] = useState(0);
  const [commentOpen, setCommentOpen] = useState(false);

  const enrichedGroup = useMemo(
    () => (post.type === "group_discovery" && post.group ? enrichGroupFromDiscover(post.group) : null),
    [post.type, post.group]
  );

  const handleLike = () => {
    const was = liked;
    toggleLike(post.id);
    setLikeBump((b) => b + (was ? -1 : 1));
  };

  const displayLikes = formatCount(post.likes, likeBump);
  const pending =
    post.type === "group_discovery" && post.group && hasPendingForGroup(post.group.id);

  const handleJoinClick = () => {
    if (!post.group) return;
    if (pending) {
      withdrawJoinRequest(post.group.id);
      return;
    }
    onRequestJoin?.(post.group);
  };

  return (
    <article className="post-card">
      <div className="post-header">
        <img className="avatar" src={post.avatar} alt="" width={40} height={40} />
        <div className="post-meta">
          <div className="post-author">{post.author}</div>
          <div className="post-sub">{post.time}</div>
        </div>
        <button type="button" className="icon-btn post-more-btn" aria-label="Post options">
          <IconMoreHorizontal />
        </button>
      </div>
      <div className="post-body">{post.text}</div>

      {post.type === "group_discovery" && enrichedGroup && (
        <div className="feed-group-wrap">
          <div className="group-card group-card--feed">
            <div className="group-card-cover">
              {enrichedGroup.coverUrl ? (
                <img src={enrichedGroup.coverUrl} alt="" className="group-card-photo" />
              ) : (
                <div className="group-card-cover-fallback" />
              )}
            </div>
            <div className="group-card-body">
              <p className="group-card-name">{enrichedGroup.name}</p>
              <p className="group-card-meta">
                Private group · {enrichedGroup.memberCount}
              </p>
              <button
                type="button"
                className={`group-card-join${pending ? " group-card-join--pending" : ""}`}
                onClick={handleJoinClick}
              >
                {pending ? "Cancel request" : "Join"}
              </button>
            </div>
          </div>
        </div>
      )}

      {(displayLikes || post.comments > 0) && (
        <div className="engagement-counts">
          {displayLikes && <span>{displayLikes} likes</span>}
          {displayLikes && post.comments > 0 && " · "}
          {post.comments > 0 && <span>{post.comments} comments</span>}
        </div>
      )}

      <div className="engagement-actions engagement-actions--four">
        <button type="button" className={liked ? "liked" : ""} onClick={handleLike}>
          {liked ? <IconLikeFilled /> : <IconLikeOutline />}
          Like
        </button>
        <button type="button" onClick={() => setCommentOpen(true)}>
          <IconComment />
          Comment
        </button>
        <button type="button">
          <IconShare />
          Share
        </button>
        <button type="button" className={saved ? "saved" : ""} onClick={() => toggleSavePost(post)}>
          {saved ? <IconBookmark /> : <IconBookmarkOutline />}
          Save
        </button>
      </div>

      {commentOpen && (
        <CommentSheet postAuthor={post.author} onClose={() => setCommentOpen(false)} />
      )}
    </article>
  );
}
