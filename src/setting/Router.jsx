import Home from "../pages/Home/Home";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import Page404 from "../pages/Page404/Page404.jsx";
import Player from "../pages/Player/Player.jsx";
import MusicsList from "../pages/MusicsList/MusicsList.jsx";
import UploadSong from "../pages/UploadSong/UploadSong.jsx";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard.jsx";
import Users from "../pages/Users/Users.jsx";

let routesPath = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/play/:id", element: <Player /> },
  { path: "/list", element: <MusicsList /> },
  { path: "/admin-panel", element: <AdminDashboard /> },
  { path: "/uploadfile", element: <UploadSong /> },
  { path: "/users", element: <Users /> },
  { path: "/*", element: <Page404 /> },
];

export default routesPath;
