import Home from "../pages/Home/Home";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import Page404 from "../pages/Page404/Page404.jsx";
import Player from "../pages/Player/Player.jsx";
import MusicsList from "../pages/MusicsList/MusicsList.jsx";
import UploadSong from "../pages/UploadSong/UploadSong.jsx";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard.jsx";
import Users from "../pages/Users/Users.jsx";
import Songs from "../pages/Songs/Songs.jsx";

import { Route, Routes } from "react-router-dom";

import React from "react";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/play/:id" element={<Player />} />
        <Route path="/list" element={<MusicsList />} />
        <Route path="/admin-panel" element={<AdminDashboard />}>
          <Route path="uploadfile" element={<UploadSong />} />
          <Route path="users" element={<Users />} />
          <Route path="songs" element={<Songs />} />
        </Route>
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </>
  );
}
