import React from "react";
import { createPortal } from "react-dom";

export function CommentSheet({ postAuthor, onClose }) {
  const node = (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal-sheet comment-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="comment-sheet-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="comment-sheet-title" className="sheet-title">
          Comment on {postAuthor}&apos;s post
        </h2>
        <textarea
          className="comment-sheet-input"
          rows={4}
          placeholder="Write a comment…"
          autoFocus
        />
        <button type="button" className="btn-primary" onClick={onClose}>
          Post
        </button>
        <button type="button" className="see-more-toggle" style={{ textAlign: "center", width: "100%" }} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
