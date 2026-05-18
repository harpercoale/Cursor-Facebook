import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BottomNav } from "../components/BottomNav.jsx";
import { IconChevronBack, IconHamburger, IconMessenger, IconSearch } from "../components/Icons.jsx";

const titles = {
  "/home": null,
  "/reels": "Reels",
  "/groups": "Groups",
  "/notifications": "Notifications",
  "/profile": "Profile",
  "/menu": "Menu",
};

function headerTitle(pathname) {
  if (pathname.startsWith("/saved/")) return "Saved post";
  return titles[pathname] ?? "Facebook";
}

export function MainLayout() {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const title = headerTitle(pathname);
  const menuOpen = pathname === "/menu";
  const savedPostOpen = pathname.startsWith("/saved/");

  function handleSavedPostBack() {
    const back =
      typeof state?.from === "string" && state.from.startsWith("/") && !state.from.startsWith("/saved/")
        ? state.from
        : "/profile";
    navigate(back);
  }

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
          {savedPostOpen ? (
            <button
              type="button"
              className="fb-header-back"
              onClick={handleSavedPostBack}
              aria-label="Back to profile"
            >
              <IconChevronBack />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              className={`icon-btn${menuOpen ? " active" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={handleMenuClick}
            >
              <IconHamburger />
            </button>
          )}
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
