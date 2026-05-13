import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import {
  IconBookmark,
  IconCalendar,
  IconGame,
  IconGroups,
  IconHeart,
  IconHelp,
  IconLogout,
  IconNews,
  IconPages,
  IconReels,
  IconSettings,
  IconStorefront,
  IconVideo,
} from "../components/Icons.jsx";

const primaryNav = [
  { key: "groups", label: "Groups", Icon: IconGroups, to: "/groups" },
  { key: "market", label: "Marketplace", Icon: IconStorefront, to: "/menu" },
  { key: "dating", label: "Dating", Icon: IconHeart, to: "/menu" },
  { key: "games", label: "Games", Icon: IconGame, to: "/menu" },
];

const moreNav = [
  { key: "reels", label: "Reels", Icon: IconReels },
  { key: "watch", label: "Video", Icon: IconVideo },
  { key: "pages", label: "Pages", Icon: IconPages },
  { key: "news", label: "News", Icon: IconNews },
  { key: "events", label: "Events", Icon: IconCalendar },
  { key: "fundraisers", label: "Fundraisers", Icon: IconHeart },
];

const utilities = [
  { key: "help", label: "Help & support", Icon: IconHelp },
  { key: "settings", label: "Settings & privacy", Icon: IconSettings },
  { key: "logout", label: "Log out", Icon: IconLogout },
];

export function Menu() {
  const navigate = useNavigate();
  const { savedPostRecords, formatSavedTime } = useApp();
  const [seeMore, setSeeMore] = useState(false);

  return (
    <main style={{ paddingBottom: 24 }}>
      <div className="menu-section-title" style={{ paddingTop: 8 }}>
        Shortcuts
      </div>
      <div className="menu-list">
        {primaryNav.map((item) => {
          const Ic = item.Icon;
          return (
            <button
              key={item.key}
              type="button"
              className="menu-row"
              onClick={() => item.to && navigate(item.to)}
            >
              <span className="menu-row-icon">
                <Ic />
              </span>
              {item.label}
            </button>
          );
        })}
        {seeMore &&
          moreNav.map((item) => {
            const Ic = item.Icon;
            return (
              <button key={item.key} type="button" className="menu-row">
                <span className="menu-row-icon">
                  <Ic />
                </span>
                {item.label}
              </button>
            );
          })}
        <button
          type="button"
          className="see-more-toggle"
          onClick={() => setSeeMore((v) => !v)}
          aria-expanded={seeMore}
        >
          {seeMore ? "See less" : "See more"}
        </button>
      </div>

      <section className="menu-saved-section" aria-labelledby="menu-saved-heading">
        <div id="menu-saved-heading" className="menu-section-title">
          Saved posts
        </div>
        <div className="menu-list menu-list--saved">
          {savedPostRecords.length === 0 ? (
            <div className="menu-saved-empty-row">
              <p className="saved-empty-hint">Posts you save from your feed will appear here.</p>
            </div>
          ) : (
            savedPostRecords.map((s) => (
              <button key={s.id} type="button" className="menu-row menu-row--saved-post">
                <span className="menu-row-icon">
                  <IconBookmark />
                </span>
                <div className="menu-row-stack">
                  <span className="menu-saved-title">{s.title}</span>
                  <span className="menu-saved-meta">
                    {s.meta ? `${formatSavedTime(s.savedAt)} · ${s.meta}` : formatSavedTime(s.savedAt)}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </section>

      <div className="menu-section-title">Settings & activity</div>
      <div className="menu-list">
        {utilities.map((u) => {
          const Ic = u.Icon;
          return (
            <button key={u.key} type="button" className="menu-row">
              <span className="menu-row-icon">
                <Ic />
              </span>
              {u.label}
            </button>
          );
        })}
      </div>
    </main>
  );
}
