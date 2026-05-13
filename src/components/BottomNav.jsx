import React from "react";
import { NavLink } from "react-router-dom";
import { IconBell, IconGroups, IconHome, IconProfile, IconReels } from "./Icons.jsx";

const tabs = [
  { to: "/home", label: "Home", Icon: IconHome },
  { to: "/reels", label: "Reels", Icon: IconReels },
  { to: "/groups", label: "Groups", Icon: IconGroups },
  { to: "/notifications", label: "Notifications", Icon: IconBell },
  { to: "/profile", label: "Profile", Icon: IconProfile },
];

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main">
      {tabs.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => (isActive ? "active" : undefined)}
          end={to === "/home"}
        >
          {({ isActive }) => (
            <>
              <span className="nav-icon">
                <Icon active={isActive} />
              </span>
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
