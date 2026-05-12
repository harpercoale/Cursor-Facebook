import React from "react";
import { createPortal } from "react-dom";
import { getGroupInfoRows } from "../data/groups.js";

export function GroupInfoModal({ group, coverUrl, pending, onClose, onJoin, onVisit, onCancelRequest }) {
  if (!group) return null;

  const rows = getGroupInfoRows(group);

  const node = (
    <div className="group-info-overlay group-info-overlay--sheet" role="presentation" onClick={onClose}>
      <div
        className="group-info-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="group-info-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="group-info-sheet-handle" aria-hidden />
        <button type="button" className="group-info-sheet-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="group-info-sheet-hero">
          {coverUrl ? (
            <img src={coverUrl} alt="" className="group-info-sheet-hero-img" />
          ) : (
            <div className="group-info-hero-fallback" />
          )}
        </div>

        <div className="group-info-sheet-scroll">
          <h2 id="group-info-title" className="group-info-sheet-title">
            {group.name}
          </h2>
          <p className="group-info-sheet-sub">Private group · {group.memberCount}</p>

          <div className="group-info-sheet-about">
            <h3 className="group-info-sheet-section-label">About this group</h3>
            <p className="group-info-sheet-desc">{group.blurb}</p>
          </div>

          <div className="group-info-sheet-details">
            <h3 className="group-info-sheet-section-label">Group details</h3>
            <ul className="group-info-detail-list">
              {rows.map((row) => (
                <li key={row.label} className="group-info-detail-row">
                  <span className="group-info-detail-label">{row.label}</span>
                  <span className="group-info-detail-value">{row.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="group-info-sheet-footer">
          <button type="button" className="group-info-btn-secondary" onClick={onVisit}>
            Visit group
          </button>
          {pending ? (
            <button type="button" className="group-info-btn-secondary" onClick={() => onCancelRequest?.()}>
              Cancel request
            </button>
          ) : (
            <button type="button" className="group-info-btn-primary" onClick={onJoin}>
              Join
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
