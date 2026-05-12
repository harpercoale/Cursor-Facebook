import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout.jsx";
import { Friends } from "./pages/Friends.jsx";
import { GroupsPage } from "./pages/GroupsPage.jsx";
import { HomeFeed } from "./pages/HomeFeed.jsx";
import { JoinConfirmation } from "./pages/JoinConfirmation.jsx";
import { Menu } from "./pages/Menu.jsx";
import { Notifications } from "./pages/Notifications.jsx";
import { Reels } from "./pages/Reels.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/join-confirmation" element={<JoinConfirmation />} />
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomeFeed />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/menu" element={<Menu />} />
      </Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
