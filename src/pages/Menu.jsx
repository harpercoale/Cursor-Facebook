import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
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
