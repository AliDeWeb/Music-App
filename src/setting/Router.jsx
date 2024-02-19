import Home from "../pages/Home/Home";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import Page404 from "../pages/Page404/Page404.jsx";
import Player from "../pages/Player/Player.jsx";

let routesPath = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/play/:id", element: <Player /> },
  { path: "/*", element: <Page404 /> },
];

export default routesPath;
