import React from "react";
import { createPortal } from "react-dom";

export function JoinRequestSheet({ group, onCancel, onConfirm }) {
  if (!group) return null;

  const node = (
    <div className="modal-overlay" role="presentation" onClick={onCancel}>
      <div
        className="modal-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-sheet-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="join-sheet-title" className="sheet-title">
          Request to join {group.name}?
        </h2>
        <p className="sheet-text">
          Admins will review your request. You will be notified when you are accepted.
        </p>
        <button type="button" className="btn-primary" onClick={() => onConfirm(group)}>
          Send request
        </button>
        <button
          type="button"
          className="see-more-toggle"
          onClick={onCancel}
          style={{ textAlign: "center", marginTop: 4 }}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
