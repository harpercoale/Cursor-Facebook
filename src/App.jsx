import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout.jsx";
import { GroupsPage } from "./pages/GroupsPage.jsx";
import { HomeFeed } from "./pages/HomeFeed.jsx";
import { JoinConfirmation } from "./pages/JoinConfirmation.jsx";
import { Menu } from "./pages/Menu.jsx";
import { Notifications } from "./pages/Notifications.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Reels } from "./pages/Reels.jsx";
import { SavedPostPage } from "./pages/SavedPostPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/join-confirmation" element={<JoinConfirmation />} />
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomeFeed />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/saved/:postId" element={<SavedPostPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
