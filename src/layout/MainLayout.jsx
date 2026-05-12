import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { BottomNav } from "../components/BottomNav.jsx";
import { IconHamburger, IconMessenger, IconSearch } from "../components/Icons.jsx";

const titles = {
  "/home": null,
  "/reels": "Reels",
  "/friends": "Friends",
  "/groups": "Groups",
  "/notifications": "Notifications",
  "/menu": "Menu",
};

export function MainLayout() {
  const { pathname } = useLocation();
  const title = titles[pathname] ?? "Facebook";

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <header className="fb-header">
          <NavLink
            to="/menu"
            className={({ isActive }) => `icon-btn${isActive ? " active" : ""}`}
            aria-label="Open menu"
          >
            <IconHamburger />
          </NavLink>
          <div className="fb-header-center">
            {pathname === "/home" ? (
              <span className="fb-header-title">facebook</span>
            ) : (
              <span className="fb-header-title fb-header-title--screen">{title}</span>
            )}
          </div>
          <div className="fb-header-actions">
            <button type="button" className="icon-btn" aria-label="Search">
              <IconSearch />
            </button>
            <button type="button" className="icon-btn" aria-label="Messenger">
              <IconMessenger />
            </button>
          </div>
        </header>
        <div className="main-scroll">
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
