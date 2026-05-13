import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BottomNav } from "../components/BottomNav.jsx";
import { IconHamburger, IconMessenger, IconSearch } from "../components/Icons.jsx";

const titles = {
  "/home": null,
  "/reels": "Reels",
  "/groups": "Groups",
  "/notifications": "Notifications",
  "/profile": "Profile",
  "/menu": "Menu",
};

export function MainLayout() {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const title = titles[pathname] ?? "Facebook";
  const menuOpen = pathname === "/menu";

  function handleMenuClick() {
    if (menuOpen) {
      const back =
        typeof state?.from === "string" && state.from !== "/menu"
          ? state.from
          : "/home";
      navigate(back);
    } else {
      navigate("/menu", { state: { from: pathname } });
    }
  }

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <header className="fb-header">
          <button
            type="button"
            className={`icon-btn${menuOpen ? " active" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={handleMenuClick}
          >
            <IconHamburger />
          </button>
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
